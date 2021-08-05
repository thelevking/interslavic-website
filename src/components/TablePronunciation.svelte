<script>
	export let caption = 'Interslavic alphabet';
	export let data = [		
		['A', 'А', '', '[ɑ] ~ [a]', 'as <i>a</i> in English „f<b>a</b>ther”'],
		['B', 'Б', '', '[b]', 'as in English'],
		['C', 'Ц', '', '[t͡s]', 'as <i>ts</i> in English „bi<b>ts</b>”'],
		['Č', 'Ч', 'Pol. <b>cz</b>', '[t͡ʃ] ~ [t͡ʂ]', 'as <i>ch</i> in English „<b>ch</b>ur<b>ch</b>”'],
		['D', 'Д', '', '[d]', 'as in English'],
		['DŽ', 'ДЖ', 'Pol. <b>dż</b>, Srb./Mac. <b>џ</b>', '[d͡ʒ] ~ [d͡ʐ]', 'as <i>j</i> in English „<b>J</b>ohn”'],
		['E', 'Е', 'Rus./Bel. <b>э</b>', '[ɛ] ~ [e]', 'as <i>e</i> in English „b<b>e</b>st”'],
		['Ě', 'Є', 'Pol./Slk. <b>ie</b>, Slv./SCr. <b>je</b>, Rus./Bel. <b>е</b>, Blg. <b>йе</b>', '[jɛ] ~ [je]', 'as <i>ye</i> in English „<b>ye</b>t”'],
		['F', 'Ф', '', '[f]', 'as in English'],
		['G', 'Г', 'Ukr./Bel. <b>ґ</b>', '[g] ~ [ɦ]', 'as <i>g</i> in English „<b>g</b>ood”'],
		['H', 'Х', 'Pol./Cz./Slv. <b>ch</b>', '[x]', 'as <i>ch</i> in Scottish „lo<b>ch</b>”'],
		['I', 'И', 'Ukr./Bel. <b>і</b>', '[i] ~ [ɪ]', 'as <i>ea</i> in English „b<b>ea</b>t”'],
		['J', 'Ј', 'Rus./Ukr./Bel./Blg. <b>й</b>', '[j]', 'as <i>y</i> in English „<b>y</b>ard”'],
		['K', 'К', '', '[k]', 'as in English, but without aspiration'],
		['L', 'Л', '', '[l] ~ [ɫ]', 'as in English'],
		['LJ', 'Љ', 'Pol./Cz. <b>l</b>, Rus./Ukr./Bel./Blg. <b>ль</b>', '[lʲ] ~ [ʎ]', 'as <i>li</i> in English „mil<b>li</b>on”'],
		['M', 'М', '', '[m]', 'as in English'],
		['N', 'Н', '', '[n]', 'as in English'],
		['NJ', 'Њ', 'Pol. <b>ń</b>, Cz./Slk. <b>ň</b>, Rus./Ukr./Bel./Blg. <b>нь</b>', '[nʲ] ~ [ɲ]', 'as <i>ny</i> in English „ca<b>ny</b>on”'],
		['O', 'О', '', '[ɔ] ~ [o]', 'as <i>o</i> in English „<b>o</b>r”'],
		['P', 'П', '', '[p]', 'as in English, but without aspiration'],
		['R', 'Р', '', '[r]', 'rolled r'],
		['S', 'С', '', '[s]', 'as <i>s</i> in English „<b>s</b>pin”'],
		['Š', 'Ш', 'Pol. <b>sz</b>', '[ʃ] ~ [ʂ]', 'as <i>sh</i> in English „<b>sh</b>op”'],
		['T', 'Т', '', '[t]', 'as in English, but without aspiration'],
		['U', 'У', '', '[u]', 'as <i>oo</i> in English „b<b>oo</b>k”'],
		['V', 'В', 'Pol. <b>w</b>', '[v] ~ [ʋ]', 'as <i>v</i> in English „a<b>v</b>oid”'],
		['Y', 'Ы', 'Ukr./Slv./Scr./Mac./Blg. <b>и</b>', '[i] ~ [ɨ]', 'as <i>i</i> in English „b<b>i</b>t”'],
		['Z', 'З', '', '[z]', 'as in English'],
		['Ž', 'Ж', 'Pol. <b>ż</b>', '[ʒ] ~ [ʐ]', 'as <i>si</i> in English „vi<b>si</b>on”'],
	];
</script>

<div class="pronunciation u-table-wrapper">
	<table>
		<caption class="sr-only">Pronunciation table of {caption}</caption>
		<thead>
			<tr>
				<th scope="col">Latin</th>
				{#if data[0][1] !== null}
				<th scope="col">Cyrillic</th>
				{/if}
				{#if data[0][2] !== null}
				<th scope="col">Equivalent in Slavic languages</th>
				{/if}
				<th scope="col">IPA</th>
				<th scope="col">English pronunciation</th>
			</tr>
		</thead>
		<tbody>
			{#each data as item}
			<tr>
				<td class="pronunciation-letter">{item[0]}</td>
				{#if item[1] !== null}
				<td class="pronunciation-letter">{item[1]}</td>
				{/if}
				{#if item[2] !== null}
				<td>{@html item[2]}</td>
				{/if}
				<td>{item[3]}</td>
				<td>{@html item[4]}</td>
			</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.pronunciation-letter {
		font-weight: bold;
	}
</style>