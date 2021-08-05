const sveltePreprocess = require('svelte-preprocess');

module.exports = {
	preprocess: [
		sveltePreprocess({
			preserve: ['module'],
			postcss: {
				plugins: [require('autoprefixer')],
			},
		}),
	],
};
