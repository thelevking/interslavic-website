/**
 * Shortcodes are a useful way of making content that lives in a CMS or in markdown files dynamic.
 *
 * By default, Elder.js ships with a {{svelteComponent name="" props="" options="" /}} shortcode.
 * Try adding a clock to one of your markdown files with:
 * `{{svelteComponent name="Clock" options='{"preload":true}' props='{"foo": true}' /}}`
 *
 */

module.exports = [
	{
		shortcode: 'svelteDataComponent',
		run: async({ data, helpers, props }) => {
			function getDataItem(key) {
				return key.split('.').reduce((o,i)=>o[i], data);
			}

			let returnedProps = JSON.parse(props.props);
			if (props.keys) {
				returnedProps.systemData = Object.fromEntries(
					props.keys.split(',').map(key => [key, getDataItem(key)])
				);
			}

			// Make all data components static
			let returnedOptions = JSON.parse(props.options);
			if (!returnedOptions.hasOwnProperty('loading')) {
				returnedOptions.loading = 'none';
			}

			return helpers.inlineSvelteComponent({
				name: props.name,
				content: props.content,
				props: returnedProps,
				options: returnedOptions,
			});
		},
	},
	{
		shortcode: 'link',
		run: async({ data, request, content, helpers, props }) => {
			let [slug, anchor] = props.slug.split('#');
			if (anchor) {
				anchor = '#' + anchor;
			} else {
				anchor = '';
			}

			function getSlug(pi) {
				let slug = pi.slug;
				if (pi.frontmatter && pi.frontmatter.slug) {
					slug = '/' + pi.frontmatter.defaultSlug;
				}

				slug = slug.split('/');
				return slug[slug.length - 1];
			}
		
			// Link to English if no matching article in language
			let targetRoute = request.lang || request.route;
			let posts = data.markdown[targetRoute].filter(pi => getSlug(pi) === slug);
			if (posts.length === 0) {
				targetRoute = 'en';
				posts = data.markdown[targetRoute].filter(pi => getSlug(pi) === slug);
				if (posts.length === 0) return {
					html: `<strong>(Error: no post under slug "${slug}" found)</strong>`,
				}
			}

			// Get post title if it was omitted
			if (!content) {
				content = posts[0].frontmatter.title;
			}

			slug = helpers.permalinks[targetRoute]({ slug: posts[0].slug });
			return {
				html: `<a href="${slug}${anchor}">${content.trim()}</a>`,
			}
		}
	},
	{
		shortcode: 'subtitle',
		run: async({ props }) => {
			return {
				html: `<strong class="shortcode-subtitle u-sans-serif">${props.text}</strong>`,
				css: `.shortcode-subtitle {
					display: block; 
					font-weight: normal;
					margin-bottom: -0.75em;
				}`,
			};
		},
	},
	{
		shortcode: 'columns',
		run: async({ props, content }) => {
			return {
				html: `<div class="shortcode-columns" style="--column-width: ${props.width}">${content}</div>`,
				// Double .shortcode-columns is for bigger specificity
				css: `.shortcode-columns.shortcode-columns {
					column-width: 20em;
					column-width: var(--column-width, 20em);
					margin-top: 0;
				}`,
			}
		}
	}
];
