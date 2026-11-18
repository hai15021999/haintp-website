/**
 * Tailwind v3 — layout utilities only.
 * Colors, radius, shadow and font come from the UI kit preset (bg-ui-surface,
 * text-ui-accent, border-ui-line, rounded-ui-container, shadow-ui-card, font-ui).
 * Do not add hex palettes here: see docs/10-engineering/coding-standards.md § Styling.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
	presets: [require('./src/styles/ui-kit/tailwind-v3.preset.cjs')],
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {
			maxWidth: {
				page: '1120px',
			},
		},
	},
	plugins: [],
};
