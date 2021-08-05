<script>
	export let letters = 'A B C Č D DŽ E Ě F G H I J K L LJ M N NJ O P R S Š T U V Y Z Ž';
	export let caption = 'Interslavic Latin alphabet';
	export let explain = {};

	const data = letters.split(' ');
	const explained = Object.keys(explain).length > 0;
</script>

<figure class="alphabet">
	<figcaption class="sr-only">{caption}</figcaption>
	<ol class="alphabet-list">
		{#each data as item}
		<li class="alphabet-item {explained ? ' alphabet-item-wide' : ''} u-h3">
			{item} {item.toLowerCase()}
			{#if explained}
			<div class="alphabet-explanation">{@html explain[item]}</div>
			{/if}
		</li>
		{/each}
	</ol>
</figure>

<style>
	.alphabet {
		margin: 0 0 1rem;
	}

	.alphabet-list {
		display: flex;
		flex-wrap: wrap;
		font-family: sans-serif;
		font-family: var(--font-sans-serif);
		list-style: none;
		padding: 0;
	}

	.alphabet-item {
		align-items: center;
		border: 1px solid #ccc;
		display: flex;
		min-height: 4em;
		margin-left: -1px;
		margin-top: -1px;
		padding: 0.25em 0.5em;
		width: 4em;
	}

	.alphabet-item-wide {
		display: block;
		min-height: 6em;
		width: 6em;
	}

	.alphabet-explanation {
		font-size: 1rem;
	}
</style>