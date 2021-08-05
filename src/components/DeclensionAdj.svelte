<script>
	export let word = 'dobry';

	import ComponentInteractiveTable from './InteractiveTable.svelte';
	import ComponentWord from './Word.svelte';
	import { declensionAdjective } from '../isv/declensionAdjective';

	// Format data
	function formatData(data) {
		for (let key in data.singular) {
			let item = data.singular[key];
			
			if (item.length === 2) {
				data.singular[key] = [ item[0], item[0], item[0], item[1] ];
				continue;
			}

			const masc = item[0].split(' / ');
			data.singular[key] = [
				masc[0],
				masc[1] || masc[0],
				item[1],
				item[2]
			];
		}

		for (let key in data.plural) {
			let item = data.plural[key];

			if (item.length === 1) {
				data.plural[key] = [ item[0], item[0], item[0], item[0] ];
				continue;
			}

			const masc = item[0].split(' / ');
			data.plural[key] = [
				masc[0],
				masc[1] || masc[0],
				masc[1] || masc[0],
				item[1]
			];
		}

		return data;
	}

	let { singular, plural, comparison } = formatData(declensionAdjective(word, ''));
	const cases = [
		'nom', 'gen', 'dat', 'acc', 'ins', 'loc',
	];
	
	const defaultWord = word;
	$: onFormSubmit = function( event ) {
		word = event.target.elements.value.value;
		if ( !word.length ) word = defaultWord;

		({ singular, plural, comparison } = formatData(declensionAdjective(word, '')));
	}
</script>

<ComponentInteractiveTable value={word} {onFormSubmit}>
	<caption class="caption" slot="caption">
		<div class="sr-only">Declension table for "{word}" (adjective)</div>
		<p>Adverb: <ComponentWord {word} value={ comparison.positive[1] } />.</p>
		<p>Comparative: <ComponentWord {word} value={ comparison.comparative[0] } /> (adverb: <ComponentWord {word} value={ comparison.comparative[1] } />).</p>
		<p>Superlative: { comparison.superlative[0] } (adverb: { comparison.superlative[1] }).</p>
	</caption>
	<svelte:fragment slot="thead">
		<tr>
			<th scope="col"></th>
			<th class="colspan-header" scope="col" colspan="4">Singular</th>
			<th class="colspan-header" scope="col" colspan="4">Plural</th>
		</tr>
		<tr>
			<th scope="col"><span class="sr-only">Case</span></th>
			<th scope="col">masculine<br>(animate)</th>
			<th scope="col">masculine<br>(inanimate)</th>
			<th scope="col">neuter</th>
			<th scope="col">feminine</th>
			<th scope="col">masculine<br>(animate)</th>
			<th scope="col">masculine<br>(inanimate)</th>
			<th scope="col">neuter</th>
			<th scope="col">feminine</th>
		</tr>
	</svelte:fragment>
	<tbody slot="tbody">
		{#each cases as caseItem}
		<tr>
			<th scope="row">{ caseItem[0].toUpperCase() }{ caseItem.slice(1) }</th>
			<td><ComponentWord {word} value={ singular[caseItem][0] } /></td>
			<td><ComponentWord {word} value={ singular[caseItem][1] } /></td>
			<td><ComponentWord {word} value={ singular[caseItem][2] } /></td>
			<td><ComponentWord {word} value={ singular[caseItem][3] } /></td>
			<td><ComponentWord {word} value={ plural[caseItem][0] } /></td>
			<td><ComponentWord {word} value={ plural[caseItem][1] } /></td>
			<td><ComponentWord {word} value={ plural[caseItem][2] } /></td>
			<td><ComponentWord {word} value={ plural[caseItem][3] } /></td>
		</tr>
		{/each}
	</tbody>
</ComponentInteractiveTable>

<style>
	.caption {
		caption-side: bottom;
		font-weight: normal;
	}

	.colspan-header {
		letter-spacing: 0.25em;
		padding-bottom: 0;
		text-align: center;
		text-transform: uppercase;
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
