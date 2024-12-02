/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	important: ":root",
	darkMode: ["class", ".dark"],
	theme: {
		extend: {
			colors: {
				Grayscale0: "#FFFFFF",
				Grayscale25: "#FAFAFA",
				Grayscale50: "#F5F5F5",
				Grayscale100: "#F0F0F0",
				Grayscale150: "#EBEBEB",
				Grayscale200: "#E0E0E0",
				Grayscale250: "#C7C7C7",
				Grayscale300: "#B3B3B3",
				Grayscale350: "#949494",
				Grayscale400: "#8A8A8A",
				Grayscale450: "#616161",
				Grayscale500: "#424242",
				Grayscale550: "#3D3D3D",
				Grayscale600: "#333333",
				Grayscale700: "#292929",
				Grayscale800: "#1F1F1F",
				Grayscale900: "#0F0F0F",
				Grayscale1000: "#000000",

				Burgundy20: "#E3CDCF",
				Burgundy40: "#C79B9F",
				Burgundy60: "#AC6A6E",
				Burgundy80: "#90383E",
				Burgundy100: "#74060E",
				Burgundy120: "#5D050B",
				Burgundy140: "#460408",
				Burgundy160: "#2E0206",
				Burgundy180: "#170103",

				Gold20: "#FFEDCE",
				Gold40: "#FFDFA4",
				Gold60: "#FFD17C",
				Gold80: "#FEC44F",
				Gold100: "#FDB813",
				Gold120: "#D19A15",
				Gold140: "#A57B18",
				Gold160: "#795D1A",
				Gold180: "#4D3E1D",

				Carrot20: "#F3DDCF",
				Carrot40: "#E7BA9F",
				Carrot60: "#DA986E",
				Carrot80: "#CE753E",
				Carrot100: "#C2530E",
				Carrot120: "#A24911",
				Carrot140: "#823F15",
				Carrot160: "#613418",
				Carrot180: "#412A1C",

				Purple20: "#D5C9DD",
				Purple40: "#B59DC2",
				Purple60: "#9977AA",
				Purple80: "#825696",
				Purple100: "#6D3385",
				Purple120: "#5C336D",
				Purple140: "#482F55",
				Purple160: "#35273D",
				Purple180: "#211A25",

				Rasberry20: "#EACDC5",
				Rasberry40: "#DCA499",
				Rasberry60: "#CF7F74",
				Rasberry80: "#C35C56",
				Rasberry100: "#B8323C",
				Rasberry120: "#8F3537",
				Rasberry140: "#693030",
				Rasberry160: "#492726",
				Rasberry180: "#2A1B1A",

				Cobalt20: "#CCDAEE",
				Cobalt40: "#99B5DD",
				Cobalt60: "#6691CD",
				Cobalt80: "#336CBC",
				Cobalt100: "#0047AB",
				Cobalt120: "#003989",
				Cobalt140: "#002B67",
				Cobalt160: "#001C44",
				Cobalt180: "#000E22",

				Teal20: "#CCE6E6",
				Teal40: "#99CCCC",
				Teal60: "#66B3B3",
				Teal80: "#339999",
				Teal100: "#008080",
				Teal120: "#006666",
				Teal140: "#004D4D",
				Teal160: "#003333",
				Teal180: "#001A1A",

				Lime20: "#D5EACE",
				Lime40: "#ACD59D",
				Lime60: "#82BF6D",
				Lime80: "#59AA3C",
				Lime100: "#2F950B",
				Lime120: "#267709",
				Lime140: "#1C5907",
				Lime160: "#133C04",
				Lime180: "#091E02",
			},
			boxShadow: {
				"light-2":
					"0px 0.15px 0.45px 0px rgba(0, 0, 0, 0.11), 0px 0.8px 1.8px 0px rgba(0, 0, 0, 0.13)",
				"light-4":
					"0px 0.3px 0.9px rgba(0, 0, 0, 0.07), 0px 1.6px 3.6px rgba(0, 0, 0, 0.11)",
				"light-8":
					"0px 0.6px 1.8px rgba(0, 0, 0, 0.11), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13)",
				"light-16":
					"0px 1.2px 3.6px rgba(0, 0, 0, 0.11), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)",
				"light-32":
					"0px 2.4px 7.4px rgba(0, 0, 0, 0.18), 0px 12.8px 28.8px rgba(0, 0, 0, 0.22)",
				"light-64":
					"0px 4.8px 14.4px rgba(0, 0, 0, 0.18), 0px 25.6px 57.6px rgba(0, 0, 0, 0.22)",
				"dark-2":
					"0px 1px 2px rgba(0, 0, 0, 0.28), 0px 0px 2px rgba(0, 0, 0, 0.2)",
				"dark-4":
					"0px 0.3px 0.9px rgba(0, 0, 0, 0.07), 0px 1.6px 3.6px rgba(0, 0, 0, 0.11)",
				"dark-8":
					"0px 2px 4px rgba(0, 0, 0, 0.28), 0px 0px 2px rgba(0, 0, 0, 0.2)",
				"dark-16":
					"0px 8px 16px rgba(0, 0, 0, 0.28), 0px 0px 2px rgba(0, 0, 0, 0.2)",
				"dark-32":
					"0px 14px 28px rgba(0, 0, 0, 0.48), 0px 0px 8px rgba(0, 0, 0, 0.4)",
				"dark-64":
					"0px 0px 8px rgba(0, 0, 0, 0.4), 0px 32px 64px rgba(0, 0, 0, 0.48)",
			},
			rotate: {
				270: "270deg",
				"-45": "-45deg",
			},
			keyframes: {
				shimmer: {
					"0%": { backgroundPosition: "-1300px 0" },
					"100%": { backgroundPosition: "1300px 0" },
				},
			},
			animation: {
				shimmer: "shimmer 3.5s linear infinite",
			},
		},
		fontFamily: {
			SegoeUI: [
				'"Segoe UI"',
				"system-ui",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				"sans-serif",
			],
		},
		fontSize: {
			"54-semibold": ["54px", { lineHeight: "70px", fontWeight: "600" }],
			"40-semibold": ["40px", { lineHeight: "52px", fontWeight: "600" }],
			"40-light": ["40px", { lineHeight: "52px", fontWeight: "300" }],
			"28-semilight": ["28px", { lineHeight: "38px", fontWeight: "350" }],
			"26-semibold": ["26px", { lineHeight: "36px", fontWeight: "600" }],
			"22-semibold": ["22px", { lineHeight: "32px", fontWeight: "600" }],
			"22-regular": ["22px", { lineHeight: "32px", fontWeight: "400" }],
			"22-semilight": ["22px", { lineHeight: "32px", fontWeight: "350" }],
			"18-semibold": ["18px", { lineHeight: "24px", fontWeight: "600" }],
			"18-semilight": ["18px", { lineHeight: "24px", fontWeight: "350" }],
			"14-semibold": ["14px", { lineHeight: "24px", fontWeight: "600" }],
			"14-regular": ["14px", { lineHeight: "24px", fontWeight: "400" }],
			"12-semibold": ["12px", { lineHeight: "16px", fontWeight: "600" }],
			"12-regular": ["12px", { lineHeight: "16px", fontWeight: "400" }],
			"10-semibold": ["10px", { lineHeight: "14px", fontWeight: "600" }],
			"10-regular": ["10px", { lineHeight: "14px", fontWeight: "400" }],
		},
	},
	plugins: [
		function ({ addBase }) {
			addBase({
				"ol, ul, menu": {
					"list-style": "revert ",
					padding: "revert",
				},
			});
		},
	],
};
