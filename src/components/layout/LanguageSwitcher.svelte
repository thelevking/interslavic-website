<script>
	export let lang;
	export let data = [];
	export let posts = null;

	export let request;
	export let helpers;
	export let settings;

	import i18n from '../../i18n';
	
	const langNames = [
		['en', 'English'],
		['isv', 'Medžuslovjansky'],
		['isv-cyrl', 'Меджусловјанскы'],
	];
	
	// Get existing pages in language versions
	let langs = data.map(di => [
		di,
		helpers.permalinks[request.route]({
			slug: di,
		}),
	]);
	if (posts !== null) {
		langs = Object.keys(posts).map(ri => {
			if (!helpers.permalinks[ri]) return null;
			const langPosts = posts[ri].filter(pi => pi.slug === request.slug);
			if (langPosts.length === 0) return;

			return [
				ri,
				helpers.permalinks[ri]({
					slug: request.slug,
				}),
			];
		}).filter(Boolean);
	}
	const langData = Object.fromEntries(langs);
</script>

<svelte:head>
	{#each langNames as [langCode, name]}
		{#if lang !== langCode && langData[langCode]}
		<link rel="alternate" href="{settings.origin}{langData[langCode]}" hreflang="{langCode}">
		{/if}
	{/each}
</svelte:head>

{#if langs.length > 1}
<nav class="language-switcher" aria-labelledby="language-switcher-label">
	<h2 id="language-switcher-label" class="language-switcher-header">{i18n(lang, 'languages')}:</h2>
	<ul class="language-switcher-list">
		{#each langNames as [langCode, name]}
		{#if langData[langCode]}
			<li class="language-switcher-list-item"><a class="language-switcher-link" href="{langData[langCode]}" lang="{langCode}" hreflang="{langCode}" aria-current={lang === langCode ? 'page' : undefined}>{name}</li>
		{:else}
			<li class="language-switcher-list-item" aria-hidden="true"><span>{name}</span></li>
		{/if}
		{/each}
	</ul>
</nav>
{/if}

<style>
	.language-switcher {
		border-top: 1px solid #ccc;
		margin-top: 2em;
		padding-top: 0.5em;
	}

	/* Header */
	.language-switcher-header {
		display: inline;
		font-size: inherit;
		font-weight: inherit;
		margin-right: 0.25em;
	}

	/* List */
	.language-switcher-list {
		display: inline-flex;
		flex-wrap: wrap;
		list-style: none;
		padding-left: 0;
	}

	.language-switcher-list-item {
		margin-bottom: 0.5em;
	}
	
	.language-switcher-list-item:not(:last-child) {
		margin-right: 1em;
	}

	.language-switcher-list-item[aria-hidden] {
		color: #555;
	}

	.language-switcher-link {
		font-weight: normal;
	}

	.language-switcher-link[aria-current] {
		font-weight: bold;
	}
</style>