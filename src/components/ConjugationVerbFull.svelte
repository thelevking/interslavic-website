<script>
	export let words = [ 'byti' ];

	let word = words[0];

	import ComponentWord from './Word.svelte';
	import { conjugationVerb } from '../isv/conjugationVerb';

	let defaultData = words.map(wi => formatData(conjugationVerb(wi, '')));
	let data = defaultData;
	const forms = [
		'ja (I)', 'ty (you, sg.)', 'on/ona/ono (he/she/it)', 'my (we)', 'vy (you, pl.)', 'oni/one (they)',
	];

	let formsPast = forms.slice(0);
	formsPast.splice(2, 1, 'on (he)', 'ona (she)', 'ono (it)');
	
	// Format data
	function formatData(data) {
		return data;
	}
</script>

<div class="u-table-wrapper">
	<table>
		<caption>
			Conjugation for the verb "{word}" (present and future tenses)
		</caption>
		<thead>
			<tr>
				<th scope="col"><span class="sr-only">Inflection</span></th>
				<th scope="col">Present</th>
				<th scope="col">Imperfect<br>(simple past)</th>
				<th scope="col">Future</th>
			</tr>
		</thead>
		<tbody>
			{#each forms as formItem, i}
			<tr>
				<th scope="row">{ formItem }</th>
				{#each data as dataItem}
				<td><ComponentWord word={ dataItem.infinitive } value={ dataItem['present'][i] } /></td>
				<td><ComponentWord word={ dataItem.infinitive } value={ dataItem['imperfect'][i] } /></td>
				<td><ComponentWord word={ dataItem.infinitive } value={ dataItem['future'][i] } /></td>
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="u-table-wrapper">
	<table>
		<caption>
			Conjugation for the verb "{word}" (past tenses)
		</caption>
		<thead>
			<tr>
				<th scope="col"><span class="sr-only">Inflection</span></th>
				<th scope="col">Perfect<br>(compound past)</th>
				<th scope="col">Pluperfect</th>
				<th scope="col">Conditional</th>
			</tr>
		</thead>
		<tbody>
			{#each formsPast as formItem, i}
			<tr>
				<th scope="row">{ formItem }</th>
				{#each data as dataItem}
				<td><ComponentWord word={ dataItem.infinitive } value={ dataItem['perfect'][i] } /></td>
				<td><ComponentWord word={ dataItem.infinitive } value={ dataItem['pluperfect'][i] } /></td>
				<td><ComponentWord word={ dataItem.infinitive } value={ dataItem['conditional'][i] } /></td>
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="u-table-wrapper">
	<table>
		<caption>Conjugation for the verb "{word}" (participles and gerund)</caption>
		<tbody>
			{#each data as dataItem}
			<tr>
				<th scope="row">Gerund</th>
				<td><ComponentWord word={ dataItem.infinitive } value={ dataItem['gerund'] } /></td>
			</tr>
			<tr>
				<th scope="row">Present active participle</th>
				<td><ComponentWord word={ dataItem.infinitive } value={ dataItem['prap'] } /></td>
			</tr>
			<tr>
				<th scope="row">Past active participle</th>
				<td><ComponentWord word={ dataItem.infinitive } value={ dataItem['pfap'] } /></td>
			</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.u-table-wrapper + .u-table-wrapper {
		margin-top: 1rem;
	}
</style>