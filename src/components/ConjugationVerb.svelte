<script>
	export let words = [
		'dělati',
		'nesti',
		'hvaliti',
		'viděti'
	];
	export let tense = 'present';
	export let irregular = false;

	let word = words[0];

	import ComponentInteractiveTable from './InteractiveTable.svelte';
	import ComponentWord from './Word.svelte';
	import { conjugationVerb } from '../isv/conjugationVerb';

	let defaultData = words.map(wi => formatData(conjugationVerb(wi, '')));
	let data = defaultData;
	let forms = [
		'ja (I)', 'ty (you, sg.)', 'on/ona/ono (he/she/it)', 'my (we)', 'vy (you, pl.)', 'oni/one (they)',
	];

	if (data[0][tense].length > 6) {
		forms.splice(2, 1, 'on (he)', 'ona (she)', 'ono (it)');
	}

	if (tense === 'imperative') {
		forms = ['ty (you, sg.)', 'my (we)', 'vy (you, pl.)'];
	}
	
	// Format data
	function formatData(data) {
		data.imperative = data.imperative.split(', ');

		return data;
	}
	
	const defaultWord = word;
	$: onFormSubmit = function( event ) {
		word = event.target.elements.value.value;
		if ( !word.length ) {
			word = defaultWord;
			data = defaultData;
			return;
		}

		data = [ formatData(conjugationVerb(word, '')) ];
	}
</script>

<ComponentInteractiveTable {onFormSubmit} value={word}>
	<caption slot="caption" class="sr-only">
		{#if data.length === 1}
		Conjugation table for the verb "{word}" ({tense} tense)
		{:else}
		Conjugation table for verbs in {tense} tense
		{/if}
	</caption>
	<svelte:fragment slot="thead">
	{#if !irregular}
		<tr>
			<th class="table-header" scope="col"><span class="sr-only">Inflection</span></th>
			{#if data.length === 1}
			<th class="table-header" scope="col">Verb</th>
			{:else}
			<th class="table-header" scope="col" colspan="2">1st conjugation</th>
			<th class="table-header" scope="col" colspan="2">2nd conjugation</th>
			{/if}
		</tr>
	{/if}
	</svelte:fragment>
	<tbody slot="tbody">
		<tr>
			<th scope="row">Infinitive</th>
			{#each data as dataItem}
			<td><ComponentWord word={ dataItem.infinitive } value={ dataItem.infinitive } /></td>
			{/each}
		</tr>
		{#each forms as formItem, i}
		<tr>
			<th scope="row">{ formItem }</th>
			{#each data as dataItem}
			<td><ComponentWord word={ dataItem.infinitive } value={ dataItem[tense][i] } /></td>
			{/each}
		</tr>
		{/each}
	</tbody>
</ComponentInteractiveTable>

<style>
	.table-header {
		border-bottom: 0;
		padding-bottom: 0;
	}

	.table-header[colspan] {
		text-align: center;
	}
	
	.table-header[colspan]::after {
		content: '';
		display: block;
		height: 6px;
		border: 1px solid #888;
		border-bottom: 0;
		margin: 0.25em 1em 0;
	}
</style>
