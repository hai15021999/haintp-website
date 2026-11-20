# Plan: thêm project `werewolf-discord` vào Portfolio

> Status: Implemented with §1 defaults — chờ owner review (V-15). Chưa đánh Done: plan nói Done khi merge. · Last updated: 2026-11-20 · Owner: Hai Nguyen
> Người implement: đọc [ai-agent-guidelines.md](../00-ssot/ai-agent-guidelines.md) và [service-template.md § Portfolio project](../99-templates/service-template.md#portfolio-project) trước. Plan này **không** thay đổi rule nào; chỗ nào mâu thuẫn thì SSoT thắng.

## 0. Tóm tắt

Thêm 1 project cá nhân mới: **Werewolf (Ma Sói) Discord bot** — bot đóng vai quản trò, chạy cả ván Ma Sói trong một kênh Discord. Repo nguồn: `D:\Personal\werewolf-discord` (GitHub `hai15021999/werewolf-discord`, **private**). Làm từ 2026-11-19 đến 2026-11-20, 17 commit, đang ở phase **P2c → P3** (chưa release `v1.0.0`).

Kết quả cần có:

1. Entry mới trong `src/app/content/projects.ts`, slug `werewolf-discord`, đầy đủ các section case study (metrics, problem, flow, techStack, decisions, codeSamples, outcomes, retrospective).
2. Ảnh cover SVG 16:9.
3. (Tuỳ owner) bài case study Markdown `src/assets/case-studies/werewolf-discord.md`.
4. Cập nhật docs: `todo-active.md`.

Không cần route mới (trang `/portfolio/:slug` đã có), không thêm dependency, không đổi schema `content.types.ts`.

## 1. Câu hỏi owner phải trả lời trước khi implement (blocking)

| # | Câu hỏi | Mặc định nếu owner không trả lời |
|---|---|---|
| Q1 | Slug + title: `werewolf-discord` / "Werewolf Discord Bot"? (slug là vĩnh viễn — R7) | Dùng như đề xuất |
| Q2 | Repo đang **private**. Public repo để gắn link `Source code`, hay không gắn link? | Không gắn `links` |
| Q3 | Được phép đăng đoạn code trích từ repo (`codeSamples`, §4.7)? Repo cá nhân nên không vướng client, nhưng repo private | Có, vì là code của owner |
| Q4 | `featured: true`? About lấy 3 project `featured` **đầu tiên theo thứ tự trong mảng** (`about.component.ts:18`). Hiện có 4: valuation-platform, excel-taskpane-addin, compact-ui-kit, moonlight-werewolf → About đang hiện 3 cái đầu. Nếu bật featured cho werewolf-discord (đặt đầu nhóm Personal) thì nó sẽ đẩy compact-ui-kit ra khỏi About. Có muốn vậy không? | Không featured |
| Q5 | Có ghi rõ "làm cùng AI coding agent theo hệ SSoT docs" không? (repo có `docs/00-ssot/ai-agent-guidelines.md`, `CLAUDE.md`) | Có, 1 highlight + 1 decision, giống `valuation-platform` |
| Q6 | Trạng thái để hiển thị: "playable on Discord, chưa release công khai"? Có đã chơi ván thật trong guild nào chưa (để viết `outcomes`)? Số người/ván? | Chỉ ghi "chạy được ván đầy đủ trong guild test" **nếu owner xác nhận**; không có số liệu sử dụng |
| Q7 | Có chụp màn hình Discord (lobby, role reveal ephemeral, vote, end summary) + owner console không? Cần che username/avatar/tên guild | Bỏ `gallery` |
| Q8 | Có viết case study Markdown dài (`caseStudy: true`) không? | Không — các section có cấu trúc trong `projects.ts` là đủ |
| Q9 | Có thêm Discord.js / MongoDB / Redis / BullMQ vào `skills.ts` / resume skills không? | Không đụng |
| Q10 | Liên hệ với project `moonlight-werewolf` (cùng chủ đề Ma Sói): có muốn 1 câu nối 2 project ("Moonlight hỗ trợ quản trò người thật; bot này thay quản trò") không? | Có, 1 câu trong `context` |

Implementer: câu nào còn mở thì dùng cột mặc định và ghi lại ở `todo-active.md` (§5).

Đã làm 2026-11-20 theo cột mặc định (owner yêu cầu implement, chưa trả lời Q1–Q10). Không gắn `links`, không `featured`, không `outcomes`, không gallery, không case study Markdown, không sửa `skills.ts`. Decision 4 vẫn được đăng và đánh `// VERIFY:` vì ADR-004 còn Proposed. Q5 có highlight; không thêm decision vì §4.7 không có câu sẵn. Chi tiết ở V-15.

## 2. Nguồn sự thật (chỉ lấy fact từ đây — R1)

| Fact | Nguồn trong repo werewolf-discord |
|---|---|
| Mục đích, problem statement, scope | `docs/00-ssot/service-scope.md` §1–4 |
| Luật chơi BR-001…BR-014, số người, role, phân bổ | `service-scope.md` §5 |
| Kiến trúc hexagonal, state machine, write path | `docs/00-ssot/architecture.md` §1, §4, §5, §6.1 |
| Lưu state / lock / timer | `docs/00-ssot/adr/ADR-003-game-state-and-timers.md` |
| Tech stack + local hosting | `adr/ADR-002-tech-stack.md`, `package.json` |
| Owner console + tham số chỉnh được | `adr/ADR-004-owner-console-and-tunable-rules.md` (đang **Proposed**) |
| Phase P0–P5 | `docs/10-engineering/roadmap.md` |
| CI | `.github/workflows/ci.yml` |
| Ngày làm | `git log` — commit đầu 2026-11-19, cuối 2026-11-20 |

**Không** đọc hoặc copy gì từ `.env`, `.env.prod`, `secrets/` (R8). Không đưa ID guild / application ID / token vào site.

Con số đã kiểm chứng (2026-11-20), được dùng:

- 7 role: Werewolf, Villager, Seer, Guard, Witch, Hunter, Elder (BR-002).
- 5–12 người chơi (BR-001).
- 14 business rule có ID (BR-001…BR-014), mỗi rule có test mang ID.
- 9 trạng thái game: LOBBY, STARTING, NIGHT, WITCH, DAY, VOTING, HUNTER, ENDED, CANCELLED.
- 4 ADR (ADR-001 là template → thực chất 3 ADR quyết định: 002, 003, 004).
- 2 ngôn ngữ message bot: English + Vietnamese (`src/shared/i18n/en.ts`, `vi.ts`).
- 34 file test (`*.test.ts`), có integration test MongoDB + Redis bằng Testcontainers chạy trong CI.

**Không** dùng: % coverage (chưa đo cho site), số người chơi thật, số ván, "production-ready", "released".

## 3. Task list

| # | Task | File | Xong khi |
|---|---|---|---|
| T1 | Chốt Q1–Q10 với owner | plan này | Bảng §1 có câu trả lời |
| T2 | Thêm entry project | `src/app/content/projects.ts` | Đặt **đầu nhóm Personal** (danh sách "newest first within each type"), nội dung theo §4 |
| T3 | Vẽ cover | `src/assets/images/projects/werewolf-discord.svg` | 16:9, < 200 kB, cùng phong cách các SVG hiện có (xem `moonlight-werewolf.svg`); không dùng logo Discord chính thức (trademark) — dùng icon trăng/sói + bong bóng chat chung chung; màu đọc được ở cả light/dark |
| T4 | (Nếu Q8 = có) case study Markdown | `src/assets/case-studies/werewolf-discord.md` | Bắt đầu bằng `##`; nội dung §4.10 |
| T5 | (Nếu Q7 = có) gallery | `src/assets/images/projects/werewolf-discord/*.webp` | Ảnh đã che tên/avatar; `alt` + `caption` đầy đủ |
| T6 | Cập nhật docs | `docs/10-engineering/todo-active.md` | Row V-15 cho câu hỏi còn mở; dòng Done khi xong; `Last updated` |
| T7 | Kiểm tra | — | Toàn bộ §6 pass |

Không làm: không đổi `content.types.ts`, không thêm route/redirect, không thêm package, không sửa `tokens.css` / `components.css`, không hard-code text vào template (R3).

## 4. Nội dung đề xuất cho entry (English, vì site viết tiếng Anh)

> Owner review từng câu. Implementer copy nguyên văn sau khi owner duyệt; câu nào owner gạch thì bỏ field đó, **không** tự viết lại bằng fact khác.

### 4.1 Field cơ bản

| Field | Giá trị |
|---|---|
| `slug` | `'werewolf-discord'` |
| `title` | `'Werewolf Discord Bot'` |
| `type` | `'personal'` |
| `summary` (≤ 140 ký tự) | `'A Discord bot that moderates Werewolf games in a channel: lobby, secret roles, night actions, votes and win checks.'` |
| `context` | `'Personal project. Where Moonlight helps a human game master, this bot replaces one: the whole game runs inside a Discord channel.'` (bỏ câu 2 nếu Q10 = không) |
| `role` | `'Author'` |
| `period` | `{ start: '2026-11' }` (đang làm → không có `end`) |
| `stack` | `['Node.js 24', 'TypeScript', 'discord.js 14', 'MongoDB 8', 'Redis 8', 'BullMQ', 'zod', 'Vitest', 'Testcontainers', 'Docker Compose']` |
| `cover` | `cover('werewolf-discord')` |
| `caseStudy` | theo Q8 |
| `links` | theo Q2 — nếu public: `[{ label: 'Source code', url: 'https://github.com/hai15021999/werewolf-discord', kind: 'source' }]` |
| `featured` | theo Q4 |

### 4.2 `highlights` (3–6, outcome-first)

1. `'The bot is the moderator: it runs lobby, role reveal, night, day discussion, vote and win check without a human game master.'`
2. `'Private information stays private: roles, Seer results and Witch choices go through ephemeral messages, never the public channel.'`
3. `'Game logic is a pure TypeScript domain (state machine, roles, rules) with no Discord or database imports, so a full game plays in a unit test.'`
4. `'Phase timers are BullMQ delayed jobs with idempotent ids; live state sits in Redis behind a per-game lock and version check, with MongoDB snapshots for recovery.'`
5. `'An owner console tunes player limits, phase durations and the role deck at runtime, validated against the written rules before saving.'`
6. (nếu Q5 = có) `'Built with AI coding agents under an SSoT doc system: 14 numbered business rules, ADRs and a test named after every rule.'`

### 4.3 `metrics` (2–4, chỉ fact)

```ts
metrics: [
    { value: '7', label: 'Roles, 5–12 players' },
    { value: '14', label: 'Business rules, each with a test' },
    { value: '9', label: 'Game states in one state machine' },
    { value: '2', label: 'Languages: English, Vietnamese' },
],
```

### 4.4 `problem`

`'Werewolf needs a moderator who cannot play, has to keep every role and night action secret, and has to time phases and count votes without mistakes. On Discord the group also shares one public channel, so secrets are easy to leak.'`

### 4.5 `flow`

```ts
flow: {
    summary: 'One game per channel. Each phase ends early when everyone has acted, otherwise on its timer; the win check runs after every night and every vote.',
    steps: ['Create lobby', 'Players join', 'Roles dealt in private', 'Night actions', 'Witch / Hunter turn', 'Dawn report', 'Discussion', 'Lynch vote', 'Win check'],
},
```

### 4.6 `techStack`

```ts
techStack: [
    { layer: 'Bot', items: [
        { name: 'Node.js 24 · TypeScript (strict, ESM)', purpose: 'One bot service: Discord gateway, use cases, workers and HTTP' },
        { name: 'discord.js 14', purpose: 'Slash commands, buttons, select menus and ephemeral replies' },
        { name: 'zod', purpose: 'Validates environment config and owner console input' },
    ] },
    { layer: 'State & timers', items: [
        { name: 'Redis 8 · ioredis', purpose: 'Live game state with a version number, per-game lock, rate limits' },
        { name: 'BullMQ', purpose: 'Phase timers as delayed jobs that survive restarts and never fire twice' },
        { name: 'MongoDB 8 · Mongoose', purpose: 'Game snapshots, history, player stats and the tunable rule set' },
    ] },
    { layer: 'Operations', items: [
        { name: 'Docker Compose', purpose: 'Bot, MongoDB and Redis on one machine; separate dev and prod projects' },
        { name: 'pino · prom-client', purpose: 'JSON logs, /healthz, /readyz and /metrics' },
    ] },
    { layer: 'Testing', items: [
        { name: 'Vitest', purpose: 'Unit tests for the domain, one per business rule' },
        { name: 'Testcontainers', purpose: 'Integration tests against real MongoDB and Redis in CI' },
        { name: 'GitHub Actions', purpose: 'Typecheck, lint, format, tests and build on every pull request' },
    ] },
],
```

### 4.7 `decisions` (3–4)

1. **Pure domain, injected time and randomness**
   - context: `'Werewolf rules have many interactions (Guard, Witch, Elder, Hunter) and must be tested without Discord or databases.'`
   - decision: `'Hexagonal layering: the domain is a state machine with no I/O; clock and random numbers come in through ports, and adapters depend on the domain, never the reverse.'`
   - rationale: `'A seeded random port replays the same game in tests, and every business rule has a test named after its id.'`
2. **One writer per game**
   - context: `'Several players click vote or night-action buttons at the same moment.'`
   - decision: `'Every change goes through one path: take a Redis lock for the game, load, apply the pure domain step, save with a version check, then schedule timers and post messages.'`
   - rationale: `'Concurrent clicks cannot overwrite each other, and a failed side effect (timer, message) never turns a valid action into an error.'`
3. **Timers as idempotent jobs**
   - context: `'Phases end on timers that must survive a restart and must not fire twice.'`
   - decision: `'Each phase end is a BullMQ delayed job with id game:round:phase. The worker re-checks the current phase before advancing; on boot the bot restores missing state and timers from MongoDB.'`
   - rationale: `'Stale or duplicate jobs do nothing, and a restart mid-game does not lose the timer.'`
4. **Rules in code, numbers in a console**
   - context: `'The owner wanted to tune games without code changes, but role abilities are logic, not data.'`
   - decision: `'Split rules in two: abilities, night order, voting and win conditions stay in code; player limits, durations and the role deck are stored in MongoDB and edited in a small server-rendered console on localhost, validated against the written ranges.'`
   - rationale: `'No rule engine to maintain, and a bad value cannot be saved. Changes apply only to games created afterwards.'`

> Lưu ý cho implementer: ADR-004 đang ở trạng thái **Proposed** trong repo nguồn. Owner xác nhận trước khi đăng decision 4 (thêm vào Q-list nếu cần).

### 4.8 `codeSamples` (1 mẫu, 10–25 dòng, theo Q3)

- Nguồn: `D:\Personal\werewolf-discord\src\application\services\game-runner.ts`, hàm `mutateGame` (phần thân, từ `runExclusive` tới `return ok(update)`) **hoặc** hàm `commit` (dòng ~58–72). Copy **nguyên văn**, không sửa, ghi comment nguồn trên field `code` giống mẫu `moonlight-werewolf`.
- `title`: `'The single write path'`, `language`: `'TypeScript'`.
- `note` (đề xuất): `'Every action and every timer goes through this function: lock, load, pure domain step, version-checked save. Timers, stats and Discord messages run after the save and only log on failure.'`
- Đếm lại số dòng; > 25 dòng thì cắt bớt đầu/cuối, không ghép code từ 2 chỗ.

### 4.9 `outcomes` / `retrospective`

- `outcomes`: **chỉ** điền khi owner trả lời Q6. Ví dụ dạng câu (owner xác nhận): `'A full game runs from lobby to win in a test guild with no human moderator.'`
- `retrospective` (từ roadmap/scope, owner duyệt):
  - `'Next: crash recovery tested end to end, backups and observability targets (phase P3), then a v1.0.0 release in a real guild.'`
  - `'Later: automatic mute for dead players (needs extra Discord permissions), per-guild settings through a slash command, and more roles.'`

### 4.10 Case study Markdown (chỉ khi Q8 = có)

Các mục, mỗi mục ngắn, chỉ dùng fact §2:

1. `## How a game runs` — bảng phase + thời lượng mặc định (BR-006: Night 60 s, Day 120 s, Voting 60 s, Witch/Hunter 30 s).
2. `## Roles` — bảng 7 role (EN + VI), team, khả năng (BR-002, BR-012–014).
3. `## Role deck by player count` — bảng phân bổ BR-002.
4. `## Night resolution` — thứ tự Guard → Werewolves → Witch → Seer và các tương tác (BR-003, BR-012, BR-014).
5. `## State machine` — mô tả bằng bảng chuyển trạng thái (site **không** render Mermaid; không thêm thư viện).
6. `## Keeping secrets` — ephemeral messages, công bố cái chết không nói nguyên nhân.

Không copy nguyên văn tài liệu repo; viết lại ngắn gọn.

## 5. Cập nhật docs (cùng change)

| File | Thay đổi |
|---|---|
| `docs/10-engineering/todo-active.md` | Thêm `V-15` (Owner must verify): các câu Q còn mở, file `projects.ts` (`werewolf-discord`), priority Medium. Khi xong: thêm dòng vào phần Done. Cập nhật `Last updated` |
| `docs/10-engineering/plan-werewolf-discord-portfolio.md` | Đổi Status → `Done` khi merge, hoặc xoá file nếu owner muốn (đã có row trong todo) |
| `content/resume.ts` | **Không** đổi — project cá nhân, không thuộc `experience[]` |
| `content/skills.ts` | Chỉ khi Q9 = có |

Không cần sửa `api-contracts.md` / `service-scope.md` (không có route hay schema mới).

## 6. Kiểm tra (Definition of done)

- [ ] `npx ng build` pass, không có warning mới.
- [ ] `npm start` → mở `/portfolio` (card mới nằm đầu nhóm Personal) và `/portfolio/werewolf-discord`: đủ các section, không section rỗng.
- [ ] Light + dark, 375 px + desktop; code sample không tràn ngang trên mobile.
- [ ] Nếu `featured` thay đổi: kiểm tra trang About vẫn hiện đúng 3 card.
- [ ] Cover < 200 kB, đúng 16:9, đọc được ở cả hai theme.
- [ ] `grep` không có hex color / `!important` mới ngoài `theme-haintp.css`.
- [ ] Không có token, guild/app ID, username Discord thật trong code, ảnh hay docs.
- [ ] Mọi câu trong entry khớp §4 đã được owner duyệt; câu chưa duyệt có `// VERIFY:` + row V-15.
- [ ] Không commit / push / deploy trừ khi owner yêu cầu (R9).
