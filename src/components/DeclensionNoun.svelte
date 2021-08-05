<script>
	export let headers = [ 'Hard', 'Soft' ];
	export let words = [
		'brat',
		'muž',
	];
	export let gender = 'masculine';
	export let animated = null;
	
	let word = words[0];

	import ComponentInteractiveTable from './InteractiveTable.svelte';
	import ComponentWord from './Word.svelte';
	import { declensionNoun } from '../isv/declensionNoun';
	
	let animatedLabel = '';
	if (animated !== null) {
		animatedLabel = animated ? ' animated' : ' inanimated';
	}

	// Simplify getting the declension
	function getData(word) {
		return declensionNoun(word, '', gender, animated);
	}

	let defaultData = words.map(wi => getData(wi));
	let data = defaultData;
	const cases = [
		'nom', 'gen', 'dat', 'acc', 'ins', 'loc',
	];

	const defaultWord = word;
	$: onFormSubmit = function( event ) {
		word = event.target.elements.value.value;
		if ( !word.length ) {
			word = defaultWord;
			data = defaultData;
			return;
		}

		data = [ getData(word) ];
	}
</script>

<ComponentInteractiveTable value={word} {onFormSubmit}>
	<caption slot="caption">
		{#if data.length === 1}
		Declension table for the noun "{word}"
		{:else}
		Declension table for{animatedLabel} {gender} nouns
		{/if}
	</caption>
	<svelte:fragment slot="thead">
		{#if data.length > 1}
		<tr>
			<th></th>
			<th class="colspan-header" scope="col" colspan="{headers.length}">Singular</th>
			<th class="colspan-header" scope="col" colspan="{headers.length}">Plural</th>
		{/if}
		<tr>
			<th scope="col"><span class="sr-only">Case</span></th>
			{#if data.length === 1}
			<th scope="col">Singular</th>
			<th scope="col">Plural</th>
			{:else}
			{#each headers as header}
			<th scope="col">{header}</th>
			{/each}
			{#each headers as header}
			<th scope="col">{header}</th>
			{/each}
			{/if}
		</tr>
	</svelte:fragment>
	<tbody slot="tbody">
		{#each cases as caseItem}
		<tr>
			<th scope="row">{ caseItem[0].toUpperCase() }{ caseItem.slice(1) }</th>
			{#each data as dataItem, i}
			<td><ComponentWord word={words[i]} value={ dataItem[caseItem][0] } /></td>
			{/each}
			{#each data as dataItem, i}
			<td><ComponentWord word={words[i]} value={ dataItem[caseItem][1] } /></td>
			{/each}
		</tr>
		{/each}
	</tbody>
</ComponentInteractiveTable>

<style>
	.colspan-header {
		padding-bottom: 0;
		text-align: center;
		white-space: nowrap;
	}
	
	.colspan-header::after {
		content: '';
		display: block;
		height: 6px;
		border: 1px solid #888;
		border-bottom: 0;
		margin: 0.25em 1em 0;
	}
</style>
