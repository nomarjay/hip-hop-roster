/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				tier: {
					s: '#FFD700',
					a: '#C77DFF',
					b: '#3B82F6',
					c: '#10B981',
					d: '#6B7280',
					e: '#F97316',
					f: '#DC2626',
				},
			},
		},
	},
	plugins: [],
};
