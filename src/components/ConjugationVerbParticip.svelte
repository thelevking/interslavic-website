<script>
	export let words = [
		'dělati',
		'nesti',
		'hvaliti'
	];

	let word = words[0];

	import ComponentInteractiveTable from './InteractiveTable.svelte';
	import ComponentWord from './Word.svelte';
	import { conjugationVerb } from '../isv/conjugationVerb';

	let defaultData = words.map(wi => conjugationVerb(wi, ''));
	let data = defaultData;
	const forms = [
		[ 'Present active', 'prap' ],
		[ 'Present passive', 'prpp' ],
		[ 'Past active', 'pfap' ],
		[ 'Past passive', 'pfpp' ],
		[ 'Verbal noun (gerund)', 'gerund' ],
	];
	
	const defaultWord = word;
	$: onFormSubmit = function( event ) {
		word = event.target.elements.value.value;
		if ( !word.length ) {
			word = defaultWord;
			data = defaultData;
			return;
		}

		data = [ conjugationVerb(word, '') ];
	}
</script>

<ComponentInteractiveTable value={word} onFormSubmit={onFormSubmit}>
	<caption slot="caption" class="sr-only">
		{#if data.length === 1}
		Conjugation table for participles of the verb "{word}"
		{:else}
		Conjugation table for participles of verbs
		{/if}
	</caption>
	<svelte:fragment slot="thead">
		<tr>
			<th class="table-header" scope="col"><span class="sr-only">Inflection</span></th>
			{#if data.length === 1}
			<th class="table-header" scope="col">Verb</th>
			{:else}
			<th class="table-header" scope="col" colspan="2">1st conjugation</th>
			<th class="table-header" scope="col" colspan="2">2nd conjugation</th>
			{/if}
		</tr>
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
			<th scope="row">{ formItem[0] }</th>
			{#each data as dataItem}
			<td><ComponentWord word={ dataItem.infinitive } value={ dataItem[formItem[1]] } /></td>
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
