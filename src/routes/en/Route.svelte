<script>
	// Populated from the @elderjs/plugin-markdown
	export let data;

	export let request;

	import i18n from '../../i18n';

	const { frontmatter, html, lang } = data;
</script>

<svelte:head>
	{#if frontmatter && frontmatter.title}
	<title>{frontmatter.title} | {i18n(lang, 'title')}</title>
	{/if}
	{#if frontmatter && frontmatter.excerpt}
	<meta name="description" content={frontmatter.excerpt}>
	{/if}
	<link href={request.permalink} rel="canonical">
</svelte:head>

{#if html}
	{@html html}
{:else}
	<p>Oops!! Markdown not found!</p>
{/if}
