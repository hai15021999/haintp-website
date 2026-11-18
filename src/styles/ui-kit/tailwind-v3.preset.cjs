// =====================================================================
// UI kit × Tailwind CSS v3 (3.3+)
// ---------------------------------------------------------------------
// tailwind.config.js:
//
//   module.exports = {
//     presets: [require('./src/styles/ui-kit/integrations/tailwind-v3.preset.cjs')],
//     content: ['./src/**/*.{html,ts,js}'],
//   };
//
// The preset sets darkMode to the kit's .dark class and adds utilities
// such as bg-ui-surface, text-ui-accent, border-ui-line, rounded-ui,
// shadow-ui-card, font-ui, h-ui-control. They read --ui-* at runtime, so
// they follow the active kit theme and dark mode.
//
// Load order in the main stylesheet (with postcss-import, which Tailwind
// v3 recommends for @import):
//
//   @import "tailwindcss/base";
//   @import "./ui-kit/tokens.css";
//   @import "./ui-kit/themes/ocean.css";
//   @import "tailwindcss/components";
//   @import "./ui-kit/components.css";      <- before utilities: utilities win
//   @import "tailwindcss/utilities";
//
// Limitation: v3 cannot apply opacity modifiers (bg-ui-primary/50) to
// colors defined as var(--x) holding a hex value. Use the full token, or
// upgrade to v4, which mixes with color-mix().
// =====================================================================

const v = (name) => `var(--ui-${name})`;

const colorNames = [
	'surface', 'canvas', 'hover', 'pressed', 'wash',
	'line', 'line-strong',
	'text', 'text-title', 'text-body', 'text-label', 'text-muted', 'text-disabled',
	'primary', 'primary-hover', 'on-primary', 'accent', 'focus',
	'alert', 'danger', 'on-danger', 'note-bg', 'note-text',
];

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '.dark'],
	theme: {
		extend: {
			colors: {
				ui: Object.fromEntries(colorNames.map((n) => [n, v(n)])),
			},
			borderRadius: {
				ui: v('radius'),
				'ui-container': v('radius-container'),
			},
			boxShadow: {
				'ui-card': v('shadow-card'),
				'ui-menu': v('shadow-menu'),
				'ui-popup': v('shadow-popup'),
			},
			fontFamily: {
				ui: v('font'),
			},
			height: {
				'ui-control': v('control-h'),
				'ui-row': v('row-h'),
			},
			minHeight: {
				'ui-control': v('control-h'),
			},
		},
	},
};
