
let { remarkPlugins } = require('@elderjs/plugin-markdown');

// Heading links for Markdown
const remarkAutolinkHeadings = require('remark-autolink-headings');
remarkPlugins.push([
	remarkAutolinkHeadings,
	{
		behavior: 'append',
		linkProperties: { className: 'u-anchor' },
		content: () => [
			{
				type: 'element',
				tagName: 'span',
				properties: {
					ariaHidden: 'true',
					className: 'u-h4',
				},
				children: [ { type: 'text', value: '§' } ],
			},
			{
				type: 'element',
				tagName: 'span',
				properties: {
					className: 'sr-only',
				},
				children: [
					{ type: 'text', value: 'anchor' },
				],
			},
		],
	}
]);

require('dotenv').config();
module.exports = {
	origin: '', // TODO: update this.
	lang: 'en',
	srcDir: 'src',
	distDir: 'public',
	rootDir: process.cwd(),
	build: {},
	prefix: '', // If you want your site to be built within a sub folder within your `distDir` you can use this.
	server: {},
	props: {
		hydration: 'hybrid',
		compress: false,
	},
	debug: {
		stacks: false, // output details of the stack consolidation process.
		hooks: false, // outputs the details of each hook as they are run.
		performance: false, // outputs a full performance report of how long it took to run each page.
		build: false, // gives additional details about the build process.
		automagic: false,
	},
	hooks: {
		// disable: ['elderWriteHtmlFileToPublic'], // this is used to disable internal hooks. Uncomment this hook to disabled writing your files during build.
	},
	plugins: {
		'@elderjs/plugin-markdown': {
			remarkPlugins: remarkPlugins,
			routes: ['en', 'isv', 'isv-cyrl'],
			slugFormatter: function(relativeFilePath, frontmatter) {
				var path = relativeFilePath.split( '/' );
				path = path[ path.length - 1 ].replace( '.md', '' );

				if (frontmatter && frontmatter.slug !== undefined) {
					frontmatter.defaultSlug = path;
				}

				return [
					(frontmatter && frontmatter.tag ? frontmatter.tag : null),
					(frontmatter && frontmatter.slug !== undefined ? frontmatter.slug : path),
				].filter(Boolean).join('/');
			},
			useTableOfContents: true,
			useSyntaxHighlighting: false,
		},
		'@elderjs/plugin-browser-reload': {
			// this reloads your browser when nodemon restarts your server.
			port: 8080,
			reload: false, // if you are having issues with reloading not working, change to true.
		},
		// '@elderjs/plugin-seo-check': {
		// 	display: ['errors', 'warnings'], // If the errors are too verbose remove 'warnings'
		// 	//writeLocation: './report.json', // if you want to write a report of errors
		// },
	},
	shortcodes: {
		closePattern: '}}',
		openPattern: '{{',
	},
};
