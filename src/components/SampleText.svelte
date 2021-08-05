<script>
	export let data;
</script>

<div class="sample-text">
	{#each data as item}
	<div class="sample-text-line">
		<blockquote class="sample-text-original">—&nbsp;{item[0]}</blockquote>
		<p class="sample-text-translation">
			<span class="sr-only">Translation</span> —&nbsp;{item[1]}
		</p>
	</div>
	{/each}
</div>

<style>
	.sample-text-line {
		display: flex;
		flex-wrap: wrap;
	}

	.sample-text-line > * {
		flex: 1;
		min-width: min(20em, 100%);
	}

	.sample-text-original {
		margin: 0;
	}

	.sample-text-translation {
		font-family: sans-serif;
		font-family: var(--font-sans-serif);
		margin-left: 2em;
	}
</style>