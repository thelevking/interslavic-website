/*
* Source http://steen.free.fr/interslavic/adjectivator.html
* https://github.com/sonic16x/interslavic/tree/master/src/legacy
*/

/* tslint:disable */

function applyRules(arr, postfix) {
	return arr.map(rules).map((item) => {
		return item.
			replace(/$/, postfix).
			replace(/([^/]) /g, '$1' + postfix + ' ');
	});
}

export function declensionAdjectiveFlat(adj, postfix) {
	const result = declensionAdjective(adj, postfix);
	const forms = [];
	for (const key in result) {
		if (result.hasOwnProperty(key)) {
			const notFlat = Object.values(result[key]);
			const flatArr = notFlat
				.flat()
				.map((word)=>word.replace(/ /g,'').split('/'))
				.flat();
			forms.push(...flatArr);
		}
	}
	return Array.from(new Set(forms.filter(Boolean)));
}

export function declensionAdjective(adj, postfix) {
	const root = establish_root(adj);
	const m_nom_sg = m_nominative_sg(adj, root);
	const m_acc_sg = m_accusative_sg(adj, root);
	const f_nom_sg = f_nominative_sg(root);
	const n_nom_sg = n_nominative_sg(root);
	const mn_gen_sg = mn_genitive_sg(root);
	const mn_dat_sg = mn_dative_sg(root);
	const mn_ins_sg = mn_instrumental_sg(root);
	const mn_loc_sg = mn_locative_sg(root);
	const f_acc_sg = f_accusative_sg(root);
	const f_gdl_sg = f_gendatloc_sg(root);
	const f_ins_sg = f_instrumental_sg(root);

	const m_nom_pl = m_nominative_pl(root);
	const m_acc_pl = m_accusative_pl(root);
	const fn_nom_pl = fn_nominative_pl(root);
	const glo_pl = genloc_pl(root);
	const dat_pl = dative_pl(root);
	const ins_pl = instrumental_pl(root);

	const adv = adverb(root);
	const comp_adj = comparative_adj(root);
	const comp_adv = comparative_adv(root);
	const sup_adj = superlative(root, comp_adj, 'adj');
	const sup_adv = superlative(root, comp_adv, 'adv');

	return {
		singular: {
			nom: applyRules([m_nom_sg, n_nom_sg, f_nom_sg], postfix),
			acc: applyRules([m_acc_sg, n_nom_sg, f_acc_sg], postfix),
			gen: applyRules([mn_gen_sg, f_gdl_sg], postfix),
			loc: applyRules([mn_loc_sg, f_gdl_sg], postfix),
			dat: applyRules([mn_dat_sg, f_gdl_sg], postfix),
			ins: applyRules([mn_ins_sg, f_ins_sg], postfix),
		},
		plural: {
			nom: applyRules([m_nom_pl, fn_nom_pl], postfix),
			acc: applyRules([m_acc_pl, fn_nom_pl], postfix),
			gen: applyRules([glo_pl], postfix),
			loc: applyRules([glo_pl], postfix),
			dat: applyRules([dat_pl], postfix),
			ins: applyRules([ins_pl], postfix),
		},
		comparison: {
			positive: applyRules([m_nom_sg, adv], postfix),
			comparative: applyRules([comp_adj, comp_adv], postfix),
			superlative: applyRules([sup_adj, sup_adv], postfix),
		},
	};
}

function establish_root(adj) {
	let result = '';
	if ((adj == 'na??') || (adj == 'va??')) {
		result = adj + '|^';
	} else if (adj == 'rad') {
		result = adj + '|';
	} else if (adj.slice(-3) == '??ij') {
		result = adj + '|^';
	} else if ((adj == 'sej') || (adj == 'sjej')) {
		result = adj.slice(0, -2) + '|^';
	} else if ((adj == 've??') || (adj == 'ves')) {
		result = 'vs|^';
	} else if (adj == 'onoj') {
		result = 'on|';
	} else if ((adj == 'ovoj') || (adj == 'ov')) {
		result = 'ov|';
	} else if (adj == 'jedin') {
		result = 'jedn|'
	} else if (adj == 'nijedin') {
		result = 'nijedn|'
	} else if (adj.slice(-2) == 'ov') {
		result = adj + '|';
	} else if (adj.slice(-2) == 'ev') {
		result = adj + '|';
	} else if (adj.slice(-2) == 'in') {
		result = adj + '|';
	} else if (adj.slice(-3) == 'toj') {
		result = adj.slice(0, -2) + '|';
	} else if (adj.slice(-2) == 'oj') {
		result = adj + '|^';
	} else if (adj.slice(-2) == 'en') {
		result = adj.slice(0, -2) + 'n|';
	} else if (adj.slice(-2) == 'yj') {
		result = adj.slice(0, -2);
	} else if (adj.slice(-2) == 'ij') {
		result = adj.slice(0, -2) + '^';
	} else if (adj.slice(-1) == 'y') {
		result = adj.slice(0, -1);
	} else if (adj.slice(-1) == 'i') {
		result = adj.slice(0, -1) + '^';
	} else {
		result = '';
	}

	return result
		.replace('k^', 'k')
		.replace('g^', 'g')
		.replace('h^', 'h')
	;
}

function m_nominative_sg(adj, root) {
	if (root.indexOf('|') !== -1) {
		return adj;
	} else {
		return root + 'y';
	}
}

function f_nominative_sg(root) {
	return root + 'a';
}

function n_nominative_sg(root) {
	return root + 'o';
}

function mn_genitive_sg(root) {
	return root + 'ogo';
}

function mn_dative_sg(root) {
	return root + 'omu';
}

function m_accusative_sg(adj, root) {
	return root + 'ogo / ' + adj;
}

function mn_instrumental_sg(root) {
	return root + 'ym';
}

function mn_locative_sg(root) {
	return root + 'om';
}

function f_accusative_sg(root) {
	return root + '??';
}

function f_gendatloc_sg(root) {
	return root + 'oj';
}

function f_instrumental_sg(root) {
	return root + 'oj??';
}

function m_nominative_pl(root) {
	return root + 'i / ' + root + 'e';
}

function m_accusative_pl(root) {
	return root + 'yh / ' + root + 'e';
}

function fn_nominative_pl(root) {
	return root + 'e';
}

function genloc_pl(root) {
	return root + 'yh';
}

function dative_pl(root) {
	return root + 'ym';
}

function instrumental_pl(root) {
	return root + 'ymi';
}

function adverb(root) {
	if (root.charAt(root.length - 2) == '??') {
		return root + 'i';
	} else {
		return root + 'o';
	}
}

function comparative_adj(root) {
	let result = '';
	const hacek = root.indexOf('^');
	const lastchar = hacek !== -1 ? root.length - 2 : root.length - 1;
	const vowel = /[a??e??????io??u??y]/;
	const liquid = /[lr??]/;
	const nasal = /[nm]/;

	if (root == 'velik') {
		result = 'v??????i';
	} else if (root == 'mal') {
		result = 'men??i';
	} else if (root == 'dobr') {
		result = 'l??p??i, lu????i';
	} else if (root == 'zl') {
		result = 'gor??i';
	} else if (root == 'mnog') {
		result = 'bo????i';
	} else if ((root == 'bl??g') || (root == 'blag')) {
		result = 'un??i, ' + root.substring(0, root.length - 1) + '??ej??i';
	} else if (root.lastIndexOf('sk') == root.length - 2) {
		result = 'bolje ' + root + 'i';
	} else if ((root.lastIndexOf('ok') == root.length - 2) || (root.lastIndexOf('ek') == root.length - 2)) {
		result = root.substring(0, root.length - 2) + '??i';
	} else if ((root.lastIndexOf('k') == root.length - 1) && (vowel.test(root.charAt(lastchar - 1)) == false)) {
		result = root.substring(0, root.length - 1) + '??i';
	} else {
		if (hacek == -1) {
			result = root + '%??j??i';
		} else {
			result = root + '%ej??i';
		}
	}
	result = result
		.replace(/k%/, '??')
		.replace(/g%/, '??')
		.replace(/h%/, '??')
		.replace(/l??i/, '????i')
		.replace(/g??i/, '????i')
		.replace(/le????i/, 'leg??i')
		.replace(/%/, '')
	;

	return result;
}

function comparative_adv(root) {
	let result = '';
	const hacek = root.indexOf('^');
	const lastchar = hacek !== -1 ? root.length - 2 : root.length - 1;
	const vowel = /[a??e??????io??u??y]/;
	const liquid = /[lr??]/;

	if (root == 'velik') {
		result = 'v????e';
	} else if (root == 'mal') {
		result = 'menje';
	} else if (root == 'dobr') {
		result = 'l??pje, lu????e';
	} else if (root == 'zl') {
		result = 'gorje';
	} else if (root == 'mnog') {
		result = 'bolje';
	} else if ((root == 'bl??g') || (root == 'blag')) {
		result = 'unje, ' + root.substring(0, root.length - 1) + '??eje';
	} else if (root.lastIndexOf('sk') == root.length - 2) {
		result = 'bolje ' + root + 'o';
	} else if ((root.lastIndexOf('ok') == root.length - 2) || (root.lastIndexOf('ek') == root.length - 2)) {
		result = root.substring(0, root.length - 2) + '%je';
	} else if ((root.lastIndexOf('k') == root.length - 1) && (vowel.test(root.charAt(lastchar - 1)) == false)) {
		result = root.substring(0, root.length - 1) + '%je';
	} else if (root.indexOf('^') != -1) {
		result = root + 'eje';
	} else {
		result = root + '%??je';
	}
	result = result
		.replace(/k%??/, '??e')
		.replace(/g%??/, '??e')
		.replace(/h%??/, '??e')
		.replace(/k%j/, 'k??')
		.replace(/g%j/, 'g??')
		.replace(/st%j/, '????')
		.replace(/s%j/, '??')
		.replace(/z%j/, '??')
		.replace(/t%j/, '??')
		.replace(/d%j/, 'd??')
		.replace(/%/, '')
	;

	return result;
}

function superlative(root, comp, srt) {
	if (root === 'dobr' && srt === 'adj') {
		return 'najl??p??i, najlu????i';
	}
	if (root === 'dobr' && srt === 'adv') {
		return 'najl??pje, najlu????e';
	}
	if (root === 'bl??g' && srt === 'adj') {
		return 'najun??i, najbl????ej??i';
	}
	if (root === 'blag' && srt === 'adj') {
		return 'najun??i, najbla??ej??i';
	}
	if (root === 'bl??g' && srt === 'adv') {
		return 'najunje, najbl????eje';
	}
	if (root === 'blag' && srt === 'adv') {
		return 'najunje, najbla??eje';
	}

	return 'naj' + comp;
}

function rules(word) {
	return word
		.replace(/\^o/g, '^e')
		.replace(/\^y/g, '^i')
		.replace(/s\|\^e/g, 'se')
		.replace(/s\|\^i/g, 'si')
		.replace(/\|/g, '')
		/*.replace('??^', '??')
		.replace('??^', '??')
		.replace('??^', '??')
		.replace('??^', '??')
		.replace('c^', 'c')*/
		.replace(/l\^/g, 'lj')
		.replace(/n\^/g, '??')
		.replace(/r\^/g, '??')
		.replace(/j\^/g, 'j')
		.replace(/t\^/g, '??')
		.replace(/d\^/g, '??')
		.replace(/s\^/g, '??')
		.replace(/z\^/g, '??')
		.replace(/\^/g, '')
		.replace(/jy/g, 'ji')
		.replace(/cy/g, 'ci')
		;
}
