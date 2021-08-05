const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const os = require('os');

const fetch = require('node-fetch');

/**
 * Hooks! 
 * 
 * Lifecycle hooks are the backbone of how you can have complete control over the output of your site.
 * Hooks are enforced via the hookInterface 'contract' defined here: 
				https://github.com/Elderjs/elderjs/blob/master/src/hookInterface/hookInterface.ts
 *
 * If you read the hookInterface spec closely you'll see that each defined hook gets specific 'props' along with which of those props is 'mutable'.
 * 
 * If you're a fan of 'pure' functions in JS, mutating props will probably set off alarm bells in your head. Fear not, instead of burying 
 * what is mutating things deep in your application, you'll know it is probably in this file.
 *
 * Also, to help keep mutation predictable each 'hook' limits which 'props' can be manipulated and where. 
 * 
 */

const hooks = [
	{
		hook: 'bootstrap',
		name: 'copyAssetsToPublic',
		description:
			'Copies ./assets/ to the "distDir" defined in the elder.config.js. This function helps support the live reload process.',
		run: ({ settings }) => {
			// note that this function doesn't manipulate any props or return anything.
			// It is just executed on the 'bootstrap' hook which runs once when Elder.js is starting.

			// copy assets folder to public destination
			glob.sync(path.resolve(settings.rootDir, './assets/**/*')).forEach((file) => {
				const parsed = path.parse(file);
				// Only write the file/folder structure if it has an extension
				if (parsed.ext && parsed.ext.length > 0) {
					const relativeToAssetsFolder = path.relative(path.join(settings.rootDir, './assets'), file);
					const outputPath = path.resolve(settings.distDir, relativeToAssetsFolder);
					fs.ensureDirSync(path.parse(outputPath).dir);
					fs.outputFileSync(outputPath, fs.readFileSync(file));
				}
			});
		},
	},
	{
		hook: 'bootstrap',
		name: 'getWikipediaLinks',
		description: 'Get titles of articles on Interslavic in different Wikipedias.',
		run: async ({ data }) => {
			const id = 'Q148971';

			const wikipediaList = await fetch(`https://www.wikidata.org/w/api.php?format=json&action=wbgetentities&ids=${id}&props=sitelinks/urls&utf8=true`).then(res => res.json()).then(res => res.entities[id].sitelinks);

			if (!data.externalData) data.externalData = {};
			data.externalData.wikipediaList = wikipediaList;

			return {
				data: {
					...data,
				}
			};
		}
	},
	{
		hook: 'data',
		name: 'addDataToMarkdownComponents',
		description: 'Adds shared data to components in Markdown files.',
		priority: 51,
		run: async({ request, data }) => {
			if (data.markdown && data.markdown[request.route]) {
				const markdown = data.markdown[request.route].find((m) => m.slug === request.slug);
				if (markdown) {
					let { html } = markdown;

					// Add language data to all Svelte components
					html = html.replace(/props='{(.*?)\}/g, (m, s1) => {
						if (s1.startsWith('"lang":')) return m;
						return `props='{"lang":"${data.lang}"${s1 === '' ? '' : ','}${s1}}`;
					});

					markdown.html = html;

					return {
						data: {
							...data
						},
					};
				}
			}
		}
	},
	{
		hook: 'stacks',
		name: 'i18nHtmlLang',
		description: 'Set different lang attribute to html tag when needed.',
		priority: 100,
		run: async ({ data, htmlAttributesStack }) => {
			return {
				htmlAttributesStack: [
					...htmlAttributesStack.filter((attr) => attr.source !== 'elderAddHtmlLangAttributes'),
					{
						source: 'i18nHtmlLang',
						priority: 100,
						string: `lang="${data.lang || 'en'}"`
					}
				]
			}
		}
	},
];
module.exports = hooks;
