<script>
	export let data;
</script>

{#if data && data.length > 1}
<nav id="toc" class="toc" aria-labelledby="toc-label">
	<h2 class="sr-only" id="toc-label">Table of contents</h2>
	<ol class="toc-list">
		{#each data as item}
		<li class="toc-list-item"><a href="#{item.id}">{item.text}</a></li>
		{/each}
	</ol>
</nav>
{/if}

<style>
	.toc {
		margin: 0.5em 0 1em;
	}

	.toc-list {
		display: inline-flex;
		flex-wrap: wrap;
		list-style: none;
		margin-bottom: -0.5em;
		padding-left: 0;
	}

	.toc-list-item {
		margin-bottom: 0.5em;
	}

	.toc-list-item:not(:last-child) {
		margin-right: 1em;
	}
</style>