module.exports = {
	template: 'Route.svelte',
	data: {
		lang: 'isv',
	},
	all: () => [],
	permalink: '/:slug/',
	// permalink: ({ request }) => (request.slug ? `/${request.slug}` : `/`),
};
