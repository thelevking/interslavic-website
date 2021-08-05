<script>
	export let data;
	export let helpers;
	
	export let lang = 'en';
	export let slug;

	import i18n from '../../i18n';
	import ComponentNavToC from './NavToC.svelte';

	// Dictionary list
	const dictionaryList = [
		{
			'en': 'Multilingual searchable Interslavic dictionary',
			url: 'https://interslavic-dictionary.com/',
		},
		{
			'en': 'Searchable English-Interslavic dictionary',
			url: 'http://steen.free.fr/interslavic/dynamic_dictionary.html',
		},
		{
			'en': 'Searchable Polish-Interslavic dictionary',
			url: 'http://steen.free.fr/interslavic/slownik_dynamiczny.html',
		},
		{
			'en': 'Alphabetical English-Interslavic dictionary',
			url: 'http://steen.free.fr/interslavic/en-ms.html',
		},
		{
			'en': 'Alphabetical Polish-Interslavic dictionary',
			url: 'http://steen.free.fr/interslavic/pl-ms.html',
		},
	]

	// List of tools
	const toolList = [
		{
			'en': 'Transliteration program',
			url: 'http://steen.free.fr/interslavic/transliterator.html',
		},
		{
			'en': 'Transcription program',
			url: 'http://steen.free.fr/interslavic/transliterator_extended.html',
		},
		{
			'en': 'Verb conjugator',
			url: 'http://steen.free.fr/interslavic/conjugator.html',
		},
		{
			'en': 'Spell checker',
			url: 'http://steen.free.fr/interslavic/spell_checker.html',
		},
		{
			'en': 'Words learning tool',
			url: 'http://steen.free.fr/interslavic/words_learning_tool.html',
		},
		{
			'en': 'Noun declinator',
			url: 'http://steen.free.fr/interslavic/declinator.html',
		},
		{
			'en': 'Adjective declinator',
			url: 'http://steen.free.fr/interslavic/adjectivator.html',
		},
		{
			'en': 'Voting Machine',
			url: 'http://steen.free.fr/interslavic/voting_machine.html',
		},
		{
			'en': 'Online Slavic dictionaries',
			url: 'http://steen.free.fr/interslavic/slovniky.html',
		},
		{
			'en': 'Eternal calendar',
			url: 'http://steen.free.fr/interslavic/veczny_kalendar.html',
		},
	];

	// List of topics
	let topics = [
		{ key: 'about' },
		{ key: 'letters-and-sounds' },
		{ key: 'simple-grammar' },
		{ key: 'grammar' },
		{ key: 'vocabulary' },
		{
			key: 'dictionaries',
			data: dictionaryList,
		},
		{
			key: 'tools',
			data: toolList,
		},
	];
	const addedTopics = [
		{
			key: 'dictionaries',
			data: dictionaryList,
		},
		{
			key: 'tools',
			data: toolList,
		},
	];

	// Compile navigation topics
	for (let i = 0; i < topics.length; i++) {
		const item = topics[i];
		if ( item.data ) continue;

		item.data = data[lang].filter(post => {
			post.lang = lang;
			return post.frontmatter.tag === item.key;
		});

		if (lang !== 'en') {
			item.data = item.data.concat(
				data['en'].filter(post => {
					post.lang = 'en';
					return !item.data.find(di => di.slug === post.slug) && post.frontmatter.tag === item.key;
				})
			);
		}
		
		item.data.sort((a, b) => (a.frontmatter.pos < b.frontmatter.pos ? -1 : 1));
	}

	/**
	 * @param item
	 */
	function getFullUrl(item) {
		if (item.url) return item.url;
		if (data[lang].find(post => post.slug === item.slug)) {
			return helpers.permalinks[lang]({ slug: item.slug });
		}

		return helpers.permalinks['en']({ slug: item.slug });
	}

	function getAriaCurrent(item) {
		return item.slug && item.slug === slug ? 'page' : undefined;
	}
</script>
<nav class="nav" id="nav" aria-labelledby="nav-label" tabindex="-1">
	<div class="nav-list">
		<h2 class="sr-only" id="nav-label">Navigation</h2>
		<div><a class="logo u-h2" href="{helpers.permalinks['home']({slug: lang })}" aria-current={slug === lang ? 'page' : undefined}>
			<strong class="logo-text">Interslavic language</strong>
			<small class="logo-subtitle u-h4">Medžuslovjansky jezyk</small>
		</a></div>
		<ComponentNavToC fallbackLang='en' {lang} {data} {helpers} {addedTopics}>
			<h3 slot="header" class="nav-header u-h4" let:topic>
				{i18n(lang, 'topic-' + topic.key)}
			</h3>
			<li slot="item" let:item let:fallbackLang let:getUrl class='nav-list-item {getAriaCurrent(item) && 'nav-list-item-current'}'>
				<a href="{getUrl(item)}" class="nav-link" lang={fallbackLang && item.lang} hreflang={fallbackLang && item.lang} aria-current={getAriaCurrent(item)}>
					{item[lang] || item['en'] || item.frontmatter && item.frontmatter.title}
				</a>
			</li>
		</ComponentNavToC>
	</div>
	<div class="nav-back-link"><a href="#main">{i18n(lang, 'back-top-link')}</a></div>
</nav>

<!-- <nav class="nav" id="nav" aria-labelledby="nav-label" tabindex="-1">
	<div>
		<h2 class="sr-only" id="nav-label">Navigation</h2>
		<div><a class="logo u-h2" href="{helpers.permalinks['home']({slug: lang })}" aria-current={slug === lang ? 'page' : undefined}>
			<strong class="logo-text">Interslavic language</strong>
			<small class="logo-subtitle u-h4">Medžuslovjansky jezyk</small>
		</a></div>
		{#each topics as topic}
		<h3 class="nav-header u-h4" id="nav-{topic.key}">{i18n(lang, 'topic-' + topic.key)}</h3>
		<ul class="nav-list">
			{#each topic.data as item}
			<li class={item.slug && item.slug === slug ? 'nav-list-current' : ''}>
				<a class="nav-link" href={getUrl(item)} lang={item.lang} hreflang={item.lang} aria-current={item.slug && item.slug === slug ? 'page' : undefined}>{item.title || item.frontmatter.title}</a>
			</li>
			{/each}
		</ul>
		{/each}
	</div>
	<div class="nav-back-link"><a href="#main">{i18n(lang, 'back-top-link')}</a></div>
</nav> -->

<style>
	/* Logo styles */
	.logo {
		border: 4px solid transparent;
		border-left-width: 16px;
		border-image: linear-gradient(
			#028, #028 25%,
			#ccc 25%, #ccc 50%,
			#d23 50%, #d23 75%,
			#fd0 75%, #fd0
		) 8;
		display: block;
		line-height: 1;
		padding: 1rem;
		text-underline-offset: 0.1em;
	}

	.logo-text {
		display: block;
		font-weight: normal;
	}

	.logo-subtitle {
		/* Removes underline */
		display: inline-block;
	}

	/* Navigation styles */
	.nav {
		hyphens: none;
	}

	.nav > :global(*) {
		font-size: 1.25em;
	}

	.nav-header {
		margin-top: 2rem;
	}

	.nav-list > :global(ul) {
		list-style-type: circle;
	}

	.nav-list-item:hover,
	.nav-list-item-current {
		list-style-type: disc;
	}

	.nav-list-item:focus-within {
		list-style-type: disc;
	}

	.nav-link {
		display: block;
		margin-left: -1em;
		padding-left: 1em;
		position: relative;
	}

	.nav-link[aria-current] {
		font-weight: bold;
	}

	.nav-back-link {
		margin-top: 1em;
		position: sticky;
		top: 1em;
	}

	.nav-back-link > a::before {
		content: '↑\00a0';
		display: inline-block;
	}
</style>