<script>
	export let data;
	export let helpers;

	const { lang, response } = data;
	
	import i18n from '../../i18n.js';
	import ComponentNavToC from '../../components/layout/NavToC.svelte';
	import ComponentTableWikipedia from '../../components/TableWikipedia.svelte';

	const englishLabel = {
		'en': 'English handbook',
		'isv': 'Anglijsky priručnik',
		'isv-cyrl': 'Англијскы приручник',
	}
	const wikipediaLabel = {
		'en': 'Read in your language',
		'isv': 'Čitati na svojem jezyku',
		'isv-cyrl': 'Читати на својем језыку',
	}
</script>

<svelte:head>
	<title>{i18n(lang, 'title')}</title>
</svelte:head>

{#each response as item}
{@html helpers.markdownParser.processSync(item)}
{/each}
<h2>{englishLabel[lang]}</h2>
<div class="home-toc" lang="en">
	<ComponentNavToC data={data.markdown} {helpers}>
		<h3 slot="header" class="home-toc-header u-h4" let:topic>{i18n('en', 'topic-' + topic.key)}</h3>
		<li slot="item" class="home-toc-item" let:item let:getUrl let:fallbackLang>
			<a class="home-toc-link" href="{getUrl(item)}" lang={fallbackLang && item.lang} hreflang={fallbackLang && item.lang}>{item[lang] || item['en'] || item.frontmatter.title}</a>
			{#if item.frontmatter.interslavic}<p>{item.frontmatter.interslavic}</p>{/if}
		</li>
	</ComponentNavToC>
</div>
<h2>{wikipediaLabel[lang]}</h2>
<ComponentTableWikipedia data={data.externalData} />

<style>
	.home-toc {
		font-family: sans-serif;
		font-family: var(--font-sans-serif);
	}

	.home-toc > :global(ul) {
		display: flex;
		gap: 1em;
		flex-wrap: wrap;
		list-style: none;
		margin: 0.25em 0 1em;
		padding: 0;
	}

	.home-toc-header {
		font-weight: inherit;
	}

	.home-toc-item {
		background: #F0F4F8;
		flex-basis: 18em;
		padding: 0.5em;
		padding-left: 1.5em;
		position: relative;
	}

	.home-toc-link {
		display: list-item;
		list-style: circle;
	}

	.home-toc-link:hover,
	.home-toc-link:focus {
		list-style: disc;
	}

	.home-toc-link::before {
		bottom: 0;
		content: '';
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 0;
	}
</style>