/*
* Source http://steen.free.fr/interslavic/declinator.html
*/

/* tslint:disable */
import { markFluentVowel } from './utils/markFluentVowel';
import { declensionAdjective } from './declensionAdjective';
import { removeBrackets } from './utils/removeBrackets';

function prepareGender(gender, animated) {
    if (gender === 'feminine') {
        return 'f';
    }
    if (gender === 'neuter') {
        return 'n';
    }
    if (gender === 'masculine') {
        return animated ? 'm1' : 'm2';
    }
}

export function declensionNounFlat(rawNoun, rawAdd, originGender, animated, isPlural, isSingular, isIndeclinable) {
    const result = declensionNoun(rawNoun, rawAdd, originGender, animated, isPlural, isSingular, isIndeclinable);
    if (!result) {
        return [];
    }
    const notFlat = Object.values(result);
    return Array.from(new Set(notFlat.flat().filter(Boolean)));
}

export function declensionNoun(rawNoun, rawAdd, originGender, animated, isPlural, isSingular, isIndeclinable) {
    // remove square brackets
    let noun = removeBrackets(rawNoun, '[', ']');
    // now we don't know how to decline the phrases
    if (noun.includes(' ')) {
        return null;
    }
    //indeclinable
    if (isIndeclinable) {
        return {
            nom: [noun, noun],
            acc: [noun, noun],
            gen: [noun, noun],
            loc: [noun, noun],
            dat: [noun, noun],
            ins: [noun, noun],
            voc: [noun, noun],
        };
    }
    //plural nouns
    const add = rawAdd.replace(/[()]/g, '');
    if(isPlural) {
        return declensionPluralNoun(noun, add, originGender);
    }
    //substantivized adjectives
    if(add && ['-ogo','-ego','-oj','-ej'].indexOf(add.replace(noun.slice(0,-1),'-')) !== -1) {
        return declensionSubstAdj(noun, add.replace(noun.slice(0,-1),'-'), originGender, animated);
    } else if (add && ['-ogo','-ego','-oj','-ej'].indexOf(add) !== -1) {
        return declensionSubstAdj(noun, add, originGender, animated);
    }

    if (add && noun !== add) {
        noun = markFluentVowel(noun, add);
    }

    const rawGender = prepareGender(originGender, animated);

    noun = noun + '%';
    noun = noun.replace(/[????]%/, 'nj');
    noun = noun.replace(/[????]%/, 'lj');
    noun = noun.replace(/%/, '');

    const n1 = noun.substring(0, noun.length - 2);
    let n2 = noun.substring(noun.length - 2, noun.length);
    n2 = n2.replace(/([c??????????????????????j])/g, '$1??');
    noun = n1 + n2;

    const nounWithoutFluent = noun.replace(/\([oe]\)/,'');

    noun = noun.replace( '(e)', '??').replace( '(o)', '??');

    const gender = establishGender(noun, rawGender);
    const root = establish_root(nounWithoutFluent, gender);
    const plroot = establish_plural_root(root);
    const plgen = establishPluralGender(root, plroot, gender, rawGender);

    //singular forms
    const nom_sg = nominative_sg(noun, root, gender);
    const gen_sg = genitive_sg(root, gender);
    const dat_sg = dative_sg(root, gender);
    const acc_sg = accusative_sg(nom_sg, root, gender);
    const ins_sg = instrumental_sg(root, gender);
    const loc_sg = locative_sg(root, gender);
    const voc_sg = vocative_sg(nom_sg, root, gender);

    //only singular
    if (isSingular) {
        return {
            nom: [nom_sg, null],
            acc: [acc_sg, null],
            gen: [gen_sg, null],
            loc: [loc_sg, null],
            dat: [dat_sg, null],
            ins: [ins_sg, null],
            voc: [voc_sg, null],
        };
    }

    //plural forms
    const nom_pl = nominative_pl(plroot, plgen);
    const gen_pl = genitive_pl(plroot, plgen);
    const dat_pl = dative_pl(plroot, gender);
    const acc_pl = accusative_pl(nom_pl, gen_pl, plgen);
    const ins_pl = instrumental_pl(plroot, gender);
    const loc_pl = locative_pl(plroot, gender);

    return {
        nom: [nom_sg, nom_pl],
        acc: [acc_sg, acc_pl],
        gen: [gen_sg, gen_pl],
        loc: [loc_sg, loc_pl],
        dat: [dat_sg, dat_pl],
        ins: [ins_sg, ins_pl],
        voc: [voc_sg, nom_pl],
    };
}

function establishGender(noun, gender) {
    const lastChar = noun.slice(-1);
    const beforeLastChar = noun.slice(-2, -1);
    const lastTwo = noun.slice(-2);
    const sub05 = noun.substring(0, 5);
    const sub06 = noun.substring(0, 6);
    const sub07 = noun.substring(0, 7);

    if (noun.length === 0) {
        return null;
    }
    if ((noun == 'den') || (noun == 'd??n') || (noun == 'denj??') || (noun == 'd??nj??')) {
        return 'm3';
    }
    if ((gender.charAt(0) == 'm') && (lastTwo === 'en' || (noun.lastIndexOf('enj??') == noun.length - 4))
        && ((sub05 === 'kamen') || (sub05 === 'jelen') || (sub06 === 'j????men') || (sub06 === 'je??men')
            || (sub05 === 'koren') || (sub06 === 'kremen') || (sub06 === 'pl??men') || (sub06 === 'plamen')
            || (sub06 === 'p??sten') || (sub06 === 'prsten') || (sub07 == 'strumen') || (sub06 === 'greben')
            || (sub06 === 'st??pen') || (sub06 === 'stepen') || (sub06 === 'st??pen') || (sub06 === 'stupen')
            || (sub05 === '??r??en') || (sub05 === '??????en') || (sub05 === 'sr??en') || (sub05 === 's????en')
            || (sub06 === '??er??en')
        )) {
        return 'm3';
    }
    if ((gender.charAt(0) == 'n') && ['??udo','d??lo','divo','dr??vo','igo','kolo','lic??e','nebo','oj??e','oko','slovo','t??lo', 'uho'].indexOf(noun) !== -1) {
        return 'n3';
    }
    if (gender === 'f' && lastChar === 'v') {
        return 'f3';
    }
    if (noun === 'mati' || noun === 'do????i' || noun === 'do????i') {
        return 'f3';
    }
    if (lastChar === 'a' || lastChar === 'i') {
        return 'f1';
    }
    if (lastChar === '??') {
        return 'n2';
    }
    if (beforeLastChar !== '??' && lastChar === 'e') {
        return 'n2';
    }
    if (lastChar === 'o' || lastChar === 'e') {
        return 'n1';
    }
    /*if (beforeLastChar === 'u' && lastChar === 'm') {
        return 'n1';
    }*/
    if (gender == 'm1') {
        return 'm1';
    }
    if (gender == 'f') {
        return 'f2'
    }
    return 'm2';
}

function establish_root(noun, gender) {
    let result = '';
    /*if ((noun == 'den') || (noun == 'd??n') || (noun == 'denj??') || (noun == 'd??nj??')) {
        result = 'dn';
    }*/
    if (noun == 'l??v' || noun == 'lev') {
        result = 'ljv';
    }
    else if (noun == 'L??v' || noun == 'Lev') {
        result = 'Ljv';
    }
    else if (gender.charAt(0) == 'm' && noun.match(/[e??]c??$/) &&
        (noun.slice(-5,-4).match(/[aeiouy????????????r??]/) || noun.slice(-4,-3).match(/[jdtc]/))) {
        result = noun.slice(0, -3) + 'c??';
    }
    else if (gender == 'm3') {
        result = noun + '%';
        result = result.replace('j??%', '%');
        result = result.replace('%', '');
    }
    else if ((noun == 'mati') || (noun == 'do????i') || (noun == 'do????i')) {
        result = noun.slice(0, -1) + 'er';
    }
    else if ((gender == 'f3') && ((noun.slice(-2, -1) === 'o') || (noun.slice(-2, -1) === '??')) && (noun.slice(-1) === 'v')) {
        result = noun.slice(0, -2) + 'v';
    }
    else if (gender == 'f3') {
        result = noun;
    }
    else if ((gender == 'n2') && (noun.slice(-2, -1) === 'm')) {
        result = noun.slice(0, -1) + 'en';
    }
    else if (gender == 'n2') {
        result = noun.slice(0, -1) + '??t';
    }
    else if (gender == 'f1' && (noun === 'pani' || noun.slice(-3) == 'yni')) {
        result = (noun.slice(0, -1) + 'j??');
    }
    else if (noun.slice(-1) === 'i') {
        result = (noun.slice(0, -1) + '??');
    }
    else if ((noun.slice(-1) === 'a') || (noun.slice(-1) === 'e') || (noun.slice(-1) === 'o')) {
        result = (noun.slice(0, -1));
    }
    /*else if (noun.slice(-2) === 'um') {
        result = (noun.substring(0, noun.length - 2));
    }*/
    /*	else if ((gender == 'f2') && (noun.lastIndexOf('??') == noun.length - 1))
            { result = (noun.substring (0, noun.length - 1)); } */
    else if ((gender == 'f2') && (noun.slice(-1) === '??')) {
        result = noun + '??';
    }
    else {
        result = noun;
    }

    const filler_e = result.lastIndexOf('??');
    const filler_o = result.lastIndexOf('??');
    let filler;
    if ((filler_e != -1) || (filler_o != -1)) {
        if (filler_o > filler_e) {
            filler = filler_o;
        }
        else {
            filler = filler_e;
        }
        if (filler > result.length - 3) {
            result = (result.substring(0, filler)) + (result.substring(filler + 1, result.length));
        }
    }
    return result;
}

function establish_plural_root(root) {
    let result = '';
    if ((root == 'd??t??t') || (root == 'detet') || (root == 'd??tet') || (root == 'det??t')) {
        result = 'd??t??';
    }
    else if ((root == '??lovek') || (root == '??lov??k')) {
        result = 'ljud??';
    }
    else if (root == 'ok') {
        result = 'o????';
    }
    else if (root == 'uh') {
        result = 'u????';
    }
    else if (root.substring(root.length - 4, root.length) == 'anin') {
        result = root.substring(0, root.length - 2);
    }
    else {
        result = root;
    }
    return result;
}

function establishPluralGender(root, plroot, gender, rawGender) {
    if (root !== plroot && plroot.indexOf('n') === -1) {
        return 'f2';
    }
    if (gender === 'f1' && rawGender === 'm1') {
        return 'm1';
    }
    return gender;
}

function nominative_sg(noun, root, gender) {
    let result = '';
    if (gender == 'f2') {
        result = root;
    }
    if (gender == 'f3' && (root.lastIndexOf('v') == root.length - 1)) {
        result = root.substring(0, root.length - 1) + '??v';
    }
    else if (gender == 'f3') {
        result = noun;
    }
    else if ((gender == 'm3') && (root == 'dn')) {
        result = 'den / denj';
    }
    else if (gender == 'm3') {
        result = root + ' / ' + root + 'j';
    }
    else {
        result = noun;
    }
    result = rules(result);
    return result;
}

function accusative_sg(noun, root, gender) {
    let result = '';
    if (gender == 'm1') {
        result = root + 'a';
    }
    else if (gender == 'f1') {
        result = root + '??';
    }
    else {
        result = noun;
    }
    result = rules(result);
    return result;
}

function genitive_sg(root, gender) {
    let result = '';
    if ((gender == 'm1') || (gender == 'm2') || (gender == 'n1')) {
        result = root + 'a';
    }
    else if (gender == 'f1') {
        result = root + 'y';
    }
    else if (gender == 'f2') {
        result = root + 'i';
    }
    else if (gender == 'f3') {
        result = root + 'e / ' + root + 'i';
    }
    else if (gender == 'm3') {
        result = root + 'e / ' + root + 'ja';
    }
    else if (gender == 'n2') {
        result = root + 'e / ' + root + 'a';
    }
    else if (gender == 'n3') {
        result = root + 'a / ' + palatalizationEnding(root) + 'ese';
    }
    result = rules(result);
    return result;
}

function dative_sg(root, gender) {
    let result = '';
    if ((gender == 'm1') || (gender == 'm2') || (gender == 'n1')) {
        result = root + 'u';
    }
    else if (gender == 'f1') {
        result = root + '??';
    }
    else if (gender == 'f2') {
        result = root + 'i';
    }
    else if (gender == 'f3') {
        result = root + 'i';
    }
    else if (gender == 'm3') {
        result = root + 'i / ' + root + 'ju';
    }
    else if (gender == 'n2') {
        result = root + 'i / ' + root + 'u';
    }
    else if (gender == 'n3') {
        result = root + 'u / ' + palatalizationEnding(root) + 'esi';
    }
    result = rules(result);
    return result;
}

function instrumental_sg(root, gender) {
    let result = '';
    if ((gender == 'm1') || (gender == 'm2') || (gender == 'n1')) {
        result = root + 'om';
    }
    else if (gender == 'f1') {
        result = root + 'oj??';
    }
    else if (gender == 'f2') {
        result = root + 'j??';
    }
    else if ((gender == 'f3') && (root.lastIndexOf('v') == root.length - 1)) {
        result = root.substring(0, root.length - 1) + '??vj??';
    }
    else if (gender == 'f3') {
        result = root + 'j??';
    }
    else if (gender == 'm3') {
        result = root + 'em / ' + root + 'jem';
    }
    else if (gender == 'n2') {
        result = root + 'em / ' + root + 'om';
    }
    else if (gender == 'n3') {
        result = root + 'om / ' + palatalizationEnding(root) + 'esem';
    }
    result = rules(result);
    return result;
}

function locative_sg(root, gender) {
    let result = '';
    if ((gender == 'm1') || (gender == 'm2') || (gender == 'n1')) {
        result = root + 'u';
    }
    else if (gender == 'f1') {
        result = root + '??';
    }
    else if (gender == 'f2') {
        result = root + 'i';
    }
    else if (gender == 'f3') {
        result = root + 'i';
    }
    else if (gender == 'm3') {
        result = root + 'i / ' + root + 'ju';
    }
    else if (gender == 'n2') {
        result = root + 'i / ' + root + 'u';
    }
    else if (gender == 'n3') {
        result = root + 'u / ' + palatalizationEnding(root) + 'esi';
    }
    result = rules(result);
    return result;
}

function vocative_sg(nom_sg, root, gender) {
    let result = '';
    if ((gender == 'm1') || (gender == 'm2')) {
        if (nom_sg.lastIndexOf('ec') == nom_sg.length - 2) {
            result = root.substring(0, root.length - 2) + '??e';
        }
        else if (root.lastIndexOf('??') == root.length - 1) {
            result = root + 'u';
        }
        else if (root.lastIndexOf('k') == root.length - 1) {
            result = root.substring(0, root.length - 1) + '??e';
        }
        else if (root.lastIndexOf('g') == root.length - 1) {
            result = root.substring(0, root.length - 1) + '??e';
        }
        else if (root.lastIndexOf('h') == root.length - 1) {
            result = root.substring(0, root.length - 1) + '??e';
        }
        else {
            result = root + 'e';
        }
    }
    else if (gender == 'f1') {
        result = root + '#o';
    }
    else if (gender == 'f2') {
        result = root + '#i';
    }
    else if (root == 'dn') {
        result = 'den / dnju';
    }
    else if (gender == 'm3') {
        result = root + ' / ' + root + 'ju';
    }
    else {
        result = nom_sg;
        return result;
    }
    result = rules(result);
    return result;
}

function nominative_pl(root, gender) {
    let result = '';
    if (gender == 'n3') {
        result = root + 'a / ' + palatalizationEnding(root) + 'esa';
    }
    else if(root == 'o????' || root == 'u????') {
        result = root + 'i / ' + root + 'esa';
    }
    else if (gender.charAt(0) == 'n') {
        result = root + 'a';
    }
    else if (gender == 'm1') {
        result = root + 'i';
    }
    else if ((gender == 'f1') || (gender == 'm2')) {
        result = root + 'y';
    }
    else if (gender == 'm3') {
        result = root + 'i / ' + root + 'je';
    }
    else {
        result = root + 'i';
    }
    result = rules(result);
    return result;
}

function accusative_pl(nom_pl, gen_pl, gender) {
    let result = '';
    if (gender == 'm1') {
        result = gen_pl;
    }
    else {
        result = nom_pl;
    }
    return result;
}

function genitive_pl(root, gender) {
    let result = '';
    if ((gender == 'f1') || (root == 'morj??') || (root == 'polj??')) {
        result = root.replace('??', '%');
        result = result.replace(/([pbvfmlnr])j%/, '$1ej');
        result = result + '%';
    }
    else if (root === 'st') {
        result = 's??t';
    }
    else if (gender.charAt(0) == 'n') {
        result = root.replace('??', '%')
            .replace(/([pbvfmlnrsz????????????????????])j%/, '$1ij') + '%'
        ;
        if (gender == 'n3') {
            result = result + ' / ' + palatalizationEnding(root) + 'es';
        }
    }
    else if (gender == 'm3') {
        result = root + 'ev / ' + root + 'jev';
    }
    else if (gender.charAt(0) == 'm') {
        result = root + 'ov';
    }
    else if(root == 'o????' || root == 'u????') {
        result = root + 'ij / ' + root + 'es';
    }
    else {
        result = root + 'ij';
    }
    return rules(plural_gen_ending(result));
}

function plural_gen_ending(word) {
    word = word.replace('jsk%', 'jsk')
        .replace('m??%', 'me??')
        .replace('zl%', 'z??l')
        .replace('tl%', 't??l')
        .replace('mgl%', 'mg??l')
        .replace(/([j????????????????????????c])(k)%/, '$1e$2')
        .replace(/([pbfvmlnrtdszkgh])(k)%/, '$1??$2')
        .replace(/([vmpz????t])(n)%/, '$1e$2')
        .replace(/(k)([nl])%/, '$1??$2')
        .replace(/(s)([nl])%/, '$1e$2')
        .replace(/^dn%/, 'd??n')
        .replace(/pismo%/, 'pisem')
        .replace(/^??m%/, 'tem')
        .replace(/^sto%/, 's??t')
        .replace(/%/g, '')
        ;
    return word;
}

function dative_pl(root, gender) {
    let result = '';
    if (gender == 'm3') {
        result = root + 'am / ' + root + 'jam';
    }
    else if (gender == 'n3') {
        result = root + 'am / ' + palatalizationEnding(root) + 'esam';
    }
    else {
        result = root + 'am';
    }
    result = rules(result);
    return result;
}

function instrumental_pl(root, gender) {
    let result = '';
    if (gender == 'm3') {
        result = root + 'ami / ' + root + 'jami';
    }
    else if (gender == 'n3') {
        result = root + 'ami / ' + palatalizationEnding(root) + 'esami';
    }
    else {
        result = root + 'ami';
    }
    result = rules(result);
    return result;
}

function locative_pl(root, gender) {
    let result = '';
    if (gender == 'm3') {
        result = root + 'ah / ' + root + 'jah';
    }
    else if (gender == 'n3') {
        result = root + 'ah / ' + palatalizationEnding(root) + 'esah';
    }
    else {
        result = root + 'ah';
    }
    result = rules(result);
    return result;
}

function rules(word) {
    return word.replace('??o', '??e')
        .replace('??y', '??e')
        .replace('????', 'i')
        .replace('#', '')
        .replace('t??', '??')
        .replace('d??', '??')
        .replace('s??', '??')
        .replace('z??', '??')
        .replace(/??/g, '')
        .replace('??i', 'ti')
        .replace('??i', 'di')
        .replace('??i', 'si')
        .replace('??i', 'zi')
        .replace(/??i/g, 'li')
        .replace('??i', 'ni')
        .replace('??i', 'ri')
        .replace('jy', 'ji')
        .replace('cy', 'ci')
    ;
}

function declensionPluralNoun(word, add, gender) {
    const wordWithoutLast = word.slice(0, -1);
    if (add.slice(-2) === 'yh' || add.slice(-2) === 'ih') {
        const iOrY = (add.slice(-2) === 'yh' ? 'y' : 'i');

        return {
            nom: [null, word],
            acc: [null, word],
            gen: [null, wordWithoutLast + iOrY + 'h'],
            loc: [null, wordWithoutLast + iOrY + 'h'],
            dat: [null, wordWithoutLast + iOrY + 'm'],
            ins: [null, wordWithoutLast + iOrY + 'mi'],
            voc: [null, word],
        };
    }
    else if (add) {
        return null;
    }
    else if (gender === 'masculine' && word.match(/[iye]$/)) {
        return {
            nom: [null, word],
            acc: [null, word],
            gen: [null, wordWithoutLast + 'ov'],
            loc: [null, wordWithoutLast + 'ah'],
            dat: [null, wordWithoutLast + 'am'],
            ins: [null, wordWithoutLast + 'ami'],
            voc: [null, word],
        };
    }
    else if (gender === 'feminine' && word.match(/[ye]$/ )  ||
        gender === 'neuter' && word.match(/[a]$/)) {
        return {
            nom: [null, word],
            acc: [null, word],
            gen: [null, rules(plural_gen_ending(wordWithoutLast + '%'))],
            loc: [null, wordWithoutLast + 'ah'],
            dat: [null, wordWithoutLast + 'am'],
            ins: [null, wordWithoutLast + 'ami'],
            voc: [null, word],
        };
    }
   else if (gender === 'feminine' && word.match(/[i]$/)) {
        return {
            nom: [null, word],
            acc: [null, word],
            gen: [null, wordWithoutLast + 'ij'],
            loc: [null, wordWithoutLast + 'ah'],
            dat: [null, wordWithoutLast + 'am'],
            ins: [null, wordWithoutLast + 'ami'],
            voc: [null, word],
        };
    }
    return null;
}

function declensionSubstAdj(word, add, gender, animated) {
    if (gender === 'masculine' || gender === 'neuter') {
        const adjectiveParadigm = declensionAdjective(word.slice(0,-1) + (add==='-ogo'?'y':'i'),'');
        const animatedCol = (animated?0:1);

        return {
            nom: [word, adjectiveParadigm.plural.nom[0].split('/')[animatedCol].trim()],
            acc: [adjectiveParadigm.singular.acc[0].split('/')[animatedCol].trim(),
                adjectiveParadigm.plural.acc[0].split('/')[animatedCol].trim()],
            gen: [adjectiveParadigm.singular.gen[0], adjectiveParadigm.plural.gen[0]],
            loc: [adjectiveParadigm.singular.loc[0], adjectiveParadigm.plural.loc[0]],
            dat: [adjectiveParadigm.singular.dat[0], adjectiveParadigm.plural.dat[0]],
            ins: [adjectiveParadigm.singular.ins[0], adjectiveParadigm.plural.ins[0]],
            voc: [word, adjectiveParadigm.plural.nom[0].split('/')[animatedCol].trim()],
        };
    } else {
        const adjectiveParadigm = declensionAdjective(word.slice(0,-1) + (add==='-oj'?'y':'i'), '');

        return {
            nom: [word, adjectiveParadigm.plural.nom[1]],
            acc: [adjectiveParadigm.singular.acc[1], adjectiveParadigm.plural.acc[1]],
            gen: [adjectiveParadigm.singular.gen[1], adjectiveParadigm.plural.gen[0]],
            loc: [adjectiveParadigm.singular.loc[1], adjectiveParadigm.plural.loc[0]],
            dat: [adjectiveParadigm.singular.dat[1], adjectiveParadigm.plural.dat[0]],
            ins: [adjectiveParadigm.singular.ins[1], adjectiveParadigm.plural.ins[0]],
            voc: [word, adjectiveParadigm.plural.nom[1]],
        };
    }
}

function palatalizationEnding(root) {
    const rootOneLast = root.slice(-1);
    const rootWithoutLast = root.slice(0, -1);

    if (rootOneLast === 'g') {
        return rootWithoutLast + '????';
    }
    if (rootOneLast === 'h') {
        return rootWithoutLast + '????';
    }
    if (rootOneLast === 'k') {
        return rootWithoutLast + '????';
    }
    if (root.slice(-2) === 'c??') {
        return root.slice(0, -2) + '????';
    }

    return root;
}
