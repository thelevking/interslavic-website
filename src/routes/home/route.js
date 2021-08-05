const homeData = require('./home');
const slugs = {
	en: 'en',
	isv: '',
	'isv-cyrl': 'cyrl',
}

module.exports = {
	template: 'RouteHome.svelte',
	permalink: ({ request }) => (slugs[request.slug] ? `/${slugs[request.slug]}/` : `/`),
	all: async () => {
		const firstItem = homeData[0];
		let data = [];
		for (var key in firstItem) {
			data.push({
				lang: key,
				slug: key,
			});
		}

		return data;
	},
	data: ({ request }) => {
		let { slug } = request;

		const firstItem = homeData[0];
		const response = homeData.slice(1).map(item => item[slug]);
		return {
			route: Object.keys(firstItem),
			frontmatter: {
				title: firstItem[slug],
				canonical: 'index.html',
			},
			lang: slug,
			slug,
			response,
		};
	},
};
