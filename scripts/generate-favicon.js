// Usage: node scripts/generate-favicon.js public   (regenerates favicon.ico + apple-touch-icon.png)
// Rasterizes the "</>" mark from public/favicon.svg (64-unit grid) to PNG + ICO. No dependencies.
// Keep SEGMENTS, STROKE and colors in sync with public/favicon.svg.
const fs = require('fs'), zlib = require('zlib'), path = require('path');
const out = process.argv[2] || 'public';

const BG = [0x8e, 0x2c, 0x6e]; // Plum, theme-haintp.css
const STROKE = 6; // stroke-width, round caps and joins
const SEGMENTS = [
    // [x1, y1, x2, y2, color]
    [22, 20, 11, 32, [255, 255, 255]],
    [11, 32, 22, 44, [255, 255, 255]],
    [42, 20, 53, 32, [255, 255, 255]],
    [53, 32, 42, 44, [255, 255, 255]],
    [36.5, 15, 27.5, 49, [0xf3, 0xc6, 0xe2]],
];

const inRoundRect = (x, y, w, h, r) => {
    if (x < 0 || y < 0 || x > w || y > h) return false;
    const cx = Math.min(Math.max(x, r), w - r), cy = Math.min(Math.max(y, r), h - r);
    return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
};
const distToSegment = (x, y, [x1, y1, x2, y2]) => {
    const dx = x2 - x1, dy = y2 - y1;
    const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy));
};

/** corner = background corner radius in 64-unit space (0 = full square). 4×4 supersampling. */
function render(size, corner) {
    const ss = 4, px = Buffer.alloc(size * size * 4);
    for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
        let cover = 0;
        const sum = [0, 0, 0];
        for (let sj = 0; sj < ss; sj++) for (let si = 0; si < ss; si++) {
            const x = ((i + (si + 0.5) / ss) / size) * 64, y = ((j + (sj + 0.5) / ss) / size) * 64;
            if (!inRoundRect(x, y, 64, 64, corner)) continue;
            cover++;
            // Last segment drawn wins, like SVG paint order.
            let color = BG;
            for (const s of SEGMENTS) if (distToSegment(x, y, s) <= STROKE / 2) color = s[4];
            for (let c = 0; c < 3; c++) sum[c] += color[c];
        }
        const o = (j * size + i) * 4;
        for (let c = 0; c < 3; c++) px[o + c] = cover ? Math.round(sum[c] / cover) : 0;
        px[o + 3] = Math.round((cover / (ss * ss)) * 255);
    }
    return png(size, px);
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
});
function crc(buf) {
    let x = 0xffffffff;
    for (const b of buf) x = CRC_TABLE[(x ^ b) & 0xff] ^ (x >>> 8);
    return (x ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
}
function png(size, px) {
    const row = size * 4 + 1, raw = Buffer.alloc(size * row);
    for (let y = 0; y < size; y++) px.copy(raw, y * row + 1, y * size * 4, (y + 1) * size * 4);
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(size, 0);
    ihdr.writeUInt32BE(size, 4);
    ihdr[8] = 8; // bit depth
    ihdr[9] = 6; // RGBA
    return Buffer.concat([
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
        chunk('IHDR', ihdr),
        chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
        chunk('IEND', Buffer.alloc(0)),
    ]);
}

// favicon.ico: 16, 32, 48 px PNG entries.
const sizes = [16, 32, 48], pngs = sizes.map((s) => render(s, 14));
const head = Buffer.alloc(6);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, k) => {
    const e = Buffer.alloc(16);
    e[0] = s;
    e[1] = s;
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(pngs[k].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += pngs[k].length;
    return e;
});
fs.writeFileSync(path.join(out, 'favicon.ico'), Buffer.concat([head, ...dir, ...pngs]));
// iOS rounds the corners itself, so the touch icon is a full square.
fs.writeFileSync(path.join(out, 'apple-touch-icon.png'), render(180, 0));
if (process.argv.includes('--preview')) fs.writeFileSync(path.join(out, 'favicon-preview-256.png'), render(256, 14));
console.log('favicon.ico + apple-touch-icon.png written to', out);
