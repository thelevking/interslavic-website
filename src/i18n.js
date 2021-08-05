/**
 * Only strings used in Layout.svelte or on different pages belong here.
 * For something local, doing a constant works just as well.
 */
const data = {
	'back-home-link': {
		'en': 'Back to home',
		'isv': 'Nazad na glavnu',
		'isv-cyrl': 'Назад на главну',
	},
	'back-top-link': {
		'en': 'Back to top',
		'isv': 'Do gory',
		'isv-cyrl': 'До горы',
	},
	'languages': {
		'en': 'Languages',
		'isv': 'Jezyky',
		'isv-cyrl': 'Језыкы',
	},
	'skip-link': {
		'en': 'Skip to navigation',
		'isv': 'Prějdti k navigaciji',
		'isv-cyrl': 'Прєјдти к навигацији',
	},
	'title': {
		'en': 'Learn Interslavic language',
		'isv': 'Učite medžuslovjansky jezyk',
		'isv-cyrl': 'Учите меджусловјанскы језык',
	},
	'topic-about': {
		'en': 'About Interslavic',
		'isv': 'O medžuslovjanskom',
		'isv-cyrl': 'О меджусловјанском',
	},
	'topic-dictionaries': {
		'en': 'Dictionaries',
		'isv': 'Slovniky',
		'isv-cyrl': 'Словникы',
	},
	'topic-grammar': {
		'en': 'Advanced grammar',
		'isv': 'Trudna gramatika',
		'isv-cyrl': 'Трудна граматика',
	},
	'topic-letters-and-sounds': {
		'en': 'Letters and sounds',
		'isv': 'Bukvy i zvuky',
		'isv-cyrl': 'Буквы и звукы',
	},
	'topic-simple-grammar': {
		'en': 'Simple grammar',
		'isv': 'Oproščena gramatika',
		'isv-cyrl': 'Опрошчена граматика',
	},
	'topic-tools': {
		'en': 'Tools',
		'isv': 'Orudja',
		'isv-cyrl': 'Орудја',
	},
	'topic-vocabulary': {
		'en': 'Vocabulary',
		'isv': 'Slovosbor',
		'isv-cyrl': 'Словосбор',
	},
};

module.exports = function(lang, key) {
	if (!key) return '';
	const noMessage = `(${key})`;
	if (!lang) return noMessage;
	if (!data.hasOwnProperty(key)) return noMessage;
	
	return data[key][lang] || data[key]['en'] || noMessage;
}