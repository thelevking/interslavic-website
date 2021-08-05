<script>
	const list = [
		['ja', 'ty', 'on', 'se'],
		['my', 'vy', 'oni'],
	];

	import ComponentWord from './Word.svelte';
	import { declensionPronoun } from '../isv/declensionPronoun';

	function formatData(data) {
		for (let key in data.casesSingular) {
			let item = data.casesSingular[key];
			if (item.length === 2) {
				item.splice(1, 0, item[0]);
			}
		}
		
		for (let key in data.casesPlural) {
			let item = data.casesPlural[key];
			if (item.length === 1) {
				item.push(item[0]);
			}
		}

		return data;
	}

	const singular = list[0].map(wi => formatData(declensionPronoun(wi, 'personal')));
	const plural = list[1].map(wi => formatData(declensionPronoun(wi, 'personal')));

	const cases = [
		'nom', 'gen', 'dat', 'acc', 'ins', 'loc',
	];
</script>

<div class="u-table-wrapper">
	<table>
		<caption>Declension of personal pronouns in singular</caption>
		<thead>
			<tr>
				<th colspan="3" aria-hidden="true"></th>
				<th class="colspan-header" scope="col" colspan="3">3rd person</th>
			</tr>
			<tr>
				<th scope="col"><span class="sr-only">Case</span></th>
				<th scope="col">1st person</th>
				<th scope="col">2nd person</th>
				<th scope="col">masc.</th>
				<th scope="col">neut.</th>
				<th scope="col">fem.</th>
				<th scope="col">Reflexive</th>
			</tr>
		</thead>
		<tbody>
			{#each cases as caseItem}
			<tr>
				<th scope="row">{ caseItem[0].toUpperCase() }{ caseItem.slice(1) }</th>
				{#each singular as item, i}
				{#if item.casesSingular}
					{#each item.casesSingular[caseItem] as column}
					<td><ComponentWord word={list[0][i]} value={column} /></td>
					{/each}
				{:else}
				<td><ComponentWord word={list[0][i]} value={item.cases[caseItem][0]} /></td>
				{/if}
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="u-table-wrapper">
	<table>
		<caption>Declension of personal pronouns in plural</caption>
		<thead>
			<tr>
				<th colspan="3" aria-hidden="true"></th>
				<th class="colspan-header" scope="col" colspan="2">3rd person</th>
			</tr>
			<tr>
				<th scope="col"><span class="sr-only">Case</span></th>
				<th scope="col">1st person</th>
				<th scope="col">2nd person</th>
				<th scope="col">masc. anim.</th>
				<th scope="col">other</th>
			</tr>
		</thead>
		<tbody>
			{#each cases as caseItem}
			<tr>
				<th scope="row">{ caseItem[0].toUpperCase() }{ caseItem.slice(1) }</th>
				{#each plural as item, i}
				{#if item.casesPlural}
					{#each item.casesPlural[caseItem] as column}
					<td><ComponentWord word={list[1][i]} value={column} /></td>
					{/each}
				{:else}
				<td><ComponentWord word={list[1][i]} value={item.cases[caseItem][0]} /></td>
				{/if}
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.u-table-wrapper + .u-table-wrapper {
		margin-top: 1rem;
	}

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