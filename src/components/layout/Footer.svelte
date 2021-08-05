<script>
	export let data;

	import i18n from '../../i18n';

	const lang = data.lang;
	let canonicalUrl = data.frontmatter && data.frontmatter.canonical;
	if (canonicalUrl) {
		canonicalUrl = 'steen.free.fr/interslavic/' + canonicalUrl;
	}

	const canonicalUrlLabel = {
		'en': 'Original page',
		'isv': 'Originalna stranica',
		'isv-cyrl': 'Оригинална страница',
	}

	// Community links
	const communityLabel = {
		'en': 'Interslavic community',
		'isv': 'Medžuslovjanska občina',
		'isv-cyrl': 'Меджусловјанска обчина',
	}
	const community = [
		{
			'url': 'https://www.facebook.com/groups/interslavic',
			'en': 'Facebook group',
			'isv': 'Grupa v Fejsbuku',
			'isv-cyrl': 'Група в Фейсбуку',
		},
		{
			'url': 'https://discord.gg/nhRuYAc5Uq',
			'en': 'Discord group',
			'isv': 'Grupa v Diskordu',
			'isv-cyrl': 'Група в Дискорду',
		},
		{
			'url': 'http://conference.interslavic-language.org/',
			'en': 'Conference on Interslavic language (CISLa)',
			'isv': 'Konferencija CISLa',
			'isv-cyrl': 'Конференција CISLa',
		},
		{
			'url': 'https://isv.miraheze.org/',
			'en': 'Wiki encyclopedia Medžuviki',
			'isv': 'Viki-enciklopedija Medžuviki',
			'isv-cyrl': 'Вики-енциклопедија Меджувики',
		},
		{
			'url': 'https://isv.miraheze.org/wiki/Sbornik:Glavna_stranica',
			'en': 'Text collection Vikisbornik',
			'isv': 'Sbornik tekstov Vikisbornik',
			'isv-cyrl': 'Сборник текстов Викисборник',
		},
		{
			'url': 'https://slovjani.info/',
			'en': 'Slovjani.info',
		},
		{
			'url': 'http://izvesti.info/',
			'en': 'Izvesti.info',
		},
	];

	// Organisations links
	const organisationsLabel = {
		'en': 'Friendly organisations',
		'isv': 'Prijateljske organizacije',
		'isv-cyrl': 'Пријатељске организације',
	}
	const organisations = [
		{
			'url': 'http://slovane.org/',
			'en': 'Slovanská unie',
		},
		{
			'url': 'https://www.fsk.si/',
			'en': 'Forum slovanskih kultur',
		},
		{
			'url': 'http://slavic-union.org/',
			'en': 'List of Slavic associations',
			'isv': 'Spis slovjanskyh družstev',
			'isv-cyrl': 'Спис словјанскых дружстев',
		},
	];
</script>

<footer id="footer" class="footer">
	<p>©&nbsp;Jan van Steenbergen, 2006–{new Date().getFullYear()}.</p>
	{#if canonicalUrl}
	<p>{canonicalUrlLabel[lang]}: <a href="http://{canonicalUrl}" rel="canonical">{canonicalUrl.replace('index.html', '')}</a></p>
	{/if}
	<div class="footer-container">
		<div>
			<h2 class="footer-header">{communityLabel[lang]}</h2>
			<ul class="footer-list">
				{#each community as item}
				<li><a class="footer-link" href="{item.url}" rel="nofollow">{item[lang] || item['en']}</a></li>
				{/each}
			</ul>
		</div>
		<div>
			<h2 class="footer-header">{organisationsLabel[lang]}</h2>
			<ul class="footer-list">
				{#each organisations as item}
				<li><a class="footer-link" href="{item.url}" rel="nofollow">{item[lang]|| item['en']}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: #F0F4F8;
		box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px 0 inset;
		padding: 2em 1em;
	}

	@media (min-width: 50em) {
		.footer {
			padding: 2em 3em 3em;
		}
	}

	/* Headers */
	.footer-header {
		font-size: inherit;
		margin-bottom: 0.25em;
	}

	/* Link container */
	.footer-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1em 4em;
		margin-top: 2em;
	}

	/* List styles */
	.footer-list {
		list-style: circle;
	}

	.footer-list > :global(li) + :global(li) {
		margin-top: 0.5em;
	}

	.footer-list > :global(li):hover {
		list-style: disc;
	}

	.footer-link {
		display: block;
		margin-left: -1em;
		padding-left: 1em;
		position: relative;
	}
</style>