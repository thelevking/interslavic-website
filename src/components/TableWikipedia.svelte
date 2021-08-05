<script>
	export let data;
	const { wikipediaList } = data;

	const window = {};

	import languageList from '../languageList';

	// Suggested languages list
	const suggestedLangs = [
		'en',

		'bg',
		'be',
		'be-x-old',
		'bs',
		'cs',
		'csb',
		'cu',
		'dsb',
		'hr',
		'hsb',
		'mk',
		'pl',
		'ru',
		'rue',
		'sh',
		'sk',
		'sl',
		'sr',
		'szl',
		'uk'
	];

	function getLang(code) {
		return code.replace('wiki', '').replace(/_/g, '-');
	}

	// See hooks.js for the data sources
	const suggestedList = suggestedLangs.map(si => {
		const dbName = si.replace(/_/g, '-') + 'wiki';
		const data = wikipediaList[dbName];
		if (!data) return null;

		return [
			si,
			data,
		];
	}).filter(Boolean);
	const baseList = Object.entries(wikipediaList)
		.filter(([dbName, dbData]) => !suggestedLangs.includes(getLang(dbName)))
		.map(([dbName, dbData]) => [ getLang(dbName), dbData ]);
</script>

<div class="wikipedia-list u-table-wrapper">
	<table>
		<caption class="sr-only">Wikipedia articles about Interslavic in all languages</caption>
		<thead>
			<tr>
				<th scope="col">Language</th>
				<th scope="col">Article title</th>
			</tr>
		</thead>
		<tbody>
			<tr lang="isv">
				<th scope="row">Medžuslovjansky</th>
				<td><a href="https://isv.miraheze.org/wiki/Medžuslovjansky_jezyk">Medžuslovjansky jezyk</a></td>
			</tr>
			{#each suggestedList as [key, item]}
			<tr lang="{key}" dir="auto">
				<th scope="row" class="wikipedia-list-header">{languageList[key]}</th>
				<td><a href={item.url} rel="nofollow" hreflang="{key}">{@html item.title}</a></td>
			{/each}
			{#each baseList as [key, item]}
			<tr lang="{key}" dir="auto">
				<th scope="row" class="wikipedia-list-header">{languageList[key]}</th>
				<td><a href={item.url} rel="nofollow" hreflang="{key}">{@html item.title}</a></td>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.wikipedia-list-header {
		font-weight: inherit;
	}
</style>