<script>
	export let lang;
	export let data;
	export let helpers;
	export let addedTopics = [];
	
	export let contentLang = 'en';
	export let fallbackLang;

	import i18n from '../../i18n';

	// List of topics
	let topicData = [
		{ key: 'about' },
		{ key: 'letters-and-sounds' },
		{ key: 'simple-grammar' },
		{ key: 'grammar' },
		{ key: 'vocabulary' },
	].concat(addedTopics);

	// Compile navigation topics
	for (let i = 0; i < topicData.length; i++) {
		const item = topicData[i];
		if ( item.data ) continue;

		item.data = data[contentLang].filter(post => {
			post.lang = contentLang;
			return post.frontmatter.tag === item.key;
		});

		if (fallbackLang && contentLang !== fallbackLang) {
			item.data = item.data.concat(
				data[fallbackLang].filter(post => {
					post.lang = fallbackLang;
					return !item.data.find(di => di.slug === post.slug) && post.frontmatter.tag === item.key;
				})
			);
		}
		
		item.data.sort((a, b) => (a.frontmatter.pos < b.frontmatter.pos ? -1 : 1));
	}

	/**
	 * @param item
	 */
	function getUrl(item) {
		if (item.url) return item.url;
		const postExists = data[contentLang].find(post => post.slug === item.slug);
		if (fallbackLang && !postExists) {
			return helpers.permalinks['en']({ slug: item.slug });
		}

		if (!postExists) {
			return undefined;
		}
		
		return helpers.permalinks[contentLang]({ slug: item.slug });
	}
</script>

{#each topicData as topic}
<slot name="header" {topic}>
	<h3>{i18n(contentLang, 'topic-' + topic.key)}</h3>
</slot>
<ul>
	{#each topic.data as item}
	<slot name="item" {item} {fallbackLang} {getUrl}>
	<li>
		<a href="{getUrl(item)}" lang={fallbackLang && item.lang} hreflang={fallbackLang && item.lang}>{item[lang] || item['en'] || item.frontmatter.title}</a>
	</li>
	</slot>
	{/each}
</ul>
{/each}