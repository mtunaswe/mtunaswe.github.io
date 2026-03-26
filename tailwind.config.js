/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: '#0F172A',
				brand: {
					primary: '#3B82F6',
					secondary: '#818CF8',
				},
			},
			fontFamily: {
				heading: ['"Plus Jakarta Sans"', 'sans-serif'],
				body: ['Outfit', 'sans-serif'],
			},
			borderRadius: {
				'2xl': '1rem',
				card: '1rem',
				container: '1.25rem',
			},
			boxShadow: {
				'soft-deep': '0 16px 36px -16px rgba(15, 23, 42, 0.55), 0 10px 20px -14px rgba(59, 130, 246, 0.28)',
				'soft-deeper': '0 28px 60px -24px rgba(15, 23, 42, 0.6), 0 16px 34px -22px rgba(129, 140, 248, 0.3)',
			},
		},
	},
	plugins: [],
};
