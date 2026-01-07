/** @type {import('tailwindcss').Config} */
//import flowbiteplugin from 'flowbite/plugin'

export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx,html}",
		"./index.html",
		"node_modules/flowbite-react/lib/esm/**/*.js",
	],

	theme: {
		extend: {},
	},
	plugins: [
		//  flowbiteplugin,
	],
};
