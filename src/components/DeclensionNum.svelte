<script>
	export let words = [
		[ '2 (masc.)', 'dva' ],
		[ '2 (fem.)', 'dvě' ],
		[ '3', 'tri' ],
		[ '4', 'cetyri' ],
	];

	import ComponentWord from './Word.svelte';
	import { declensionNumeral } from '../isv/declensionNumeral';

	const data = words.map(wi => declensionNumeral(wi[1], 'cardinal'));
	const cases = [
		'nom', 'gen', 'dat', 'acc', 'ins', 'loc',
	];
</script>

<div class="u-table-wrapper">
	<table>
		<caption class="sr-only">
			Declension table for {words.map(wi => wi[0]).join(', ')} (numerals)
		</caption>
		<thead>
			<tr>
				<th scope="col"><span class="sr-only">Case</span></th>
				{#each words as word}
				<th scope="col">{word[0]}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each cases as caseItem}
			<tr>
				<th scope="row">{ caseItem[0].toUpperCase() }{ caseItem.slice(1) }</th>
				{#each data as item, i}
					{#if item}
						{#each item.cases[caseItem] as value}
						<td><ComponentWord word={words[i][1]} {value} /></td>
						{/each}
					{/if}
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
</div>