<script>
	export let data;
	export let templateHtml;
	export let request;
	export let helpers;
	export let settings;

	import style from '../../assets/style.css';
	import i18n from '../i18n';

	import ComponentNav from '../components/layout/Nav.svelte';
	import ComponentToC from '../components/layout/ToC.svelte';
	import ComponentLanguageSwitcher from '../components/layout/LanguageSwitcher.svelte';
	import ComponentFooter from '../components/layout/Footer.svelte';

	// Get data for blog posts
	const { tocTree, frontmatter, lang, route, markdown } = data;

	// Warning about unofficial status
	const unofficialWarningTitle = {
		'en': 'This is an unofficial website.',
		'isv': 'Tuty sajt ne jest oficialny.',
		'isv-cyrl': 'Туты сајт не јест официалны.',
	}
	const unofficialWarningText = {
		'en': 'It is not endorsed by the authors team yet and it can have some differences in content.',
		'isv': 'Jego ješče ne podtrimaje komanda avtorov jezyka i on može imati poněktore razliky v sodržanju.',
		'isv-cyrl': 'Јего јешче не подтримаје команда авторов језыка и он може имати понєкторе разликы в содржанју.',
	}
</script>

<svelte:head>
	<script>if (document.documentElement.classList) document.documentElement.classList.add('javascript');</script>
	<script nomodule>document.documentElement.className = '';</script>
	<link href="https://rsms.me/inter/inter.css" rel="stylesheet">
</svelte:head>

<a href="#nav" class="sr-only skip-link u-h3">{i18n(lang, 'skip-link')}</a>
<div class="container">
	<main class="container-main" id="main" tabindex="-1">
		{#if frontmatter && frontmatter.title}
		{#if request.route !== 'home'}
			<a class="page-back-link" href="{helpers.permalinks['home']({ slug: lang })}">{i18n(lang, 'back-home-link')}</a>
		{/if}
		<h1 class="page-title">{frontmatter.title}</h1>
		{/if}
		{#if frontmatter && frontmatter.interslavic}
		<div class="page-subtitle u-h2">{frontmatter.interslavic}</div>
		{/if}

		<ComponentToC data={tocTree} />
		<div class="unofficial-warning">
			<p><strong>{unofficialWarningTitle[lang]}</strong> {unofficialWarningText[lang]}</p>
		</div>
		<div class="content">
			{@html templateHtml}
		</div>
		<ComponentLanguageSwitcher lang={lang} data={route} posts={(route ? null : markdown)} {helpers} {request} {settings} />
	</main>
	<ComponentNav lang={data.lang} data={data.markdown} slug={request.slug} {helpers} />
</div>
<ComponentFooter {request} {data} {helpers} />

<style>
	/* Skip link */
	.skip-link {
		display: block;
		left: 50%;
		outline: 2px solid;
		padding: 0.5em;
		position: absolute;
		top: 0;
		transform: translateX(-50%);
		white-space: nowrap;
	}

	/* Container styles */
	.container {
		display: flex;
		min-height: 100vh;
		flex-wrap: wrap;
	}

	.container > :global(*) {
		flex-basis: 25em;
		padding: 1em;
	}

	@media (min-width: 50em) {
		.container > :global(*) {
			padding: 3em;
		}
	}

	.container > .container-main {
		flex-basis: calc(100% - 25em);
		flex-grow: 1;
		min-height: 100vh;
		min-width: min(30rem, 100%);
		overflow: hidden;
	}

	/* Page title */
	.page-back-link::before {
		content: '←';
		display: inline-block;
		margin-right: 0.25em;
	}

	.page-subtitle {
		line-height: 1.25;
	}

	/* Unofficial status warning */
	.unofficial-warning {
		border: 0.2em solid #028;
		font-size: 1.25em;
		line-height: 1.25;
		margin: 0.5em 0;
		padding: 0.5em 1em;
	}

	/* Content styles */
	.content {
		font-family: Georgia, Times, 'Times New Roman', serif;
		font-size: 1.25em;
		margin-top: 0.5rem;
	}

	.content > :global(* + *) {
		margin-top: 1rem;
	}

	/* Links */
	.content :global(a) {
		font-family: sans-serif;
		font-family: var(--font-sans-serif);
		font-weight: bold;
	}
	
	/* Headings */
	.content > :global(*) + :global(h1),
	.content > :global(*) + :global(h2) {
		margin-top: 2rem;
	}

	.content > :global(*) + :global(h3),
	.content > :global(*) + :global(h4) {
		margin-top: 1rem;
	}

	.content > :global(h2) + :global(*:not(h2):not(h3):not(h4)),
	.content > :global(h3) + :global(*:not(h2):not(h3):not(h4)),
	.content > :global(h4) + :global(*:not(h2):not(h3):not(h4)) {
		margin-top: 0;
	}

	/* Page anchors */
	.content > :global(h2),
	.content > :global(h3),
	.content > :global(h4) {
		position: relative;
	}

	.content :global(.u-anchor) {
		font-weight: normal;
		float: right;
		margin-left: 1em;
	}

	@media (min-width: 50em) {
		.content :global(.u-anchor) {
			left: -1rem;
			margin-left: 0;
			position: absolute;
			top: 0;
		}
	}

	/* Quotes */
	.content :global(blockquote) > :global(*) + :global(*) {
		margin-top: 1rem;
	}
	
	/* Lists */
	.content :global(ul) {
		list-style-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 32" width="0.5em" height="1em"%3E%3Ccircle cx="8" cy="18" r="3" fill="currentColor" /%3E%3C/svg%3E');
	}

	.content :global(ol) {
		list-style: decimal;
	}

	.content > :global(*) + :global(ul),
	.content > :global(*) + :global(ol) {
		margin-top: 0;
	}

	/* Tables */
	.content :global(table) {
		font-size: 1rem;
	}
</style>