---
title: Nouns
interslavic: Imenniky
tag: grammar
pos: 0000
canonical: nouns.html
---

Like most Slavic languages, nouns in Interslavic have three grammatical genders (masculine, feminine, neuter), two numbers (singular, plural) and seven cases (nominative, accusative, genitive, dative, instrumental, locative, vocative). The vocative, used for addressing a person or object directly, is actually not a real case, as it behaves significantly different from other cases: it exists only in the singular of masculine and feminine nouns, it never affects adjectives or pronouns, and it has nothing to do with the syntactic structure of the sentence.

Long and complicated paradigms are to be avoided, but we cannot escape distinguishing between a few different word classes. Basically, Interslavic has three declensions:

- The first declension includes all masculine nouns ending in a consonant, as well as neuter nouns ending in **-o** or **-e**.
- The second declension includes all feminine nouns on **-a**.
- The third declension all feminine nouns on a consonant.
- [The fourth „athematic“ declension](#athematic-declension) is optional for some types of nouns and is described below.

Within the first declension, we distinguish between three types. This difference affects only the nominative, the accusative and the vocative:

- Masculine animate (animals and male persons): the accusative is always identical to the genitive
- Masculine inanimate (all remaining masculine nouns): the accusative is always identical to the nominative
- Neuter: the nominative, accusative and vocative are always identical

Another distinction is made between hard and soft declension patterns. Soft stems are stems ending in **š**, **ž**, **č**, **c**, **j**, **lj** or **nj**. As a rule, after a soft stem the **-o** and **-y** of the ending become **-e**, the **-ě** becomes **-i**.

The basic endings are displayed in the table below. The forms between brackets are used after soft stems:

[Missing table]

In the dictionary, only the gender of words is given. For that reason the examples below are grouped by gender and not by declension.

## Declension of masculine nouns
{{ subtitle text='Sklanjanje imennikov mužskogo roda' /}}

Virtually all masculine nouns end in a consonant. Basically, there is only one declensional pattern for masculine nouns, but a few things need to be remembered:

- In the case of animate nouns (animals and male persons) the accusative is always identical to the genitive, while in the case of inanimate objects the accusative is identical to the nominative.
- After a soft consonant, the endings **-om**, **-ov** and **-y** are changed to **-em, -ev, -e**.
- Animate nouns have the nominative plural ending **-i** instead of the ending **-y/-e** of inanimate nouns.

Four examples: **brat** „brother“, **dom** „house“, **muž** „man“, **kraj** „country“.

{{ svelteComponent name='DeclensionNoun' props='{
	"animated": true,
	"words": ["brat", "muž"]
}' options='{}' /}}

{{ svelteComponent name='DeclensionNoun' props='{
	"animated": false,
	"words": ["dom", "kraj"]
}' options='{}' /}}

Notes:

- The locative singular is where the Slavic languages differ most. The recommended ending is **-u** (i.e. the same as the dative), which in most languages occurs at least in some instances. Alternatively, it is also possible to use **-ě** after hard consonants and **-i** after soft consonants (e.g. *bratě*, *muži*).
- In the vocative, **k**, **g** and **h** become **č**, **ž** and **š** before **e**: *člověk* > *člověče*, *Bog* > *Bože*.
- Words on **-ec** have the vocative ending **-če** instead of the expected **-cu**: *otec* > *otče*.
- Some nouns ending in a hard consonant have a soft consonant in scientific orthography, f.ex. *gosť* „guest“, *lěkaŕ* „doctor, physician“. They can follow both the hard and the soft declension pattern: gen.pl. *gostov* or *gostev*.
- Words on **-anin** lose the morpheme **-in-** in the plural: nom.sg. *Slovjanin*, gen.sg. *Slovjanina*, but: nom.pl. *Slovjani*, gen.pl. *Slovjanov*.
- There are a few words on **-a** denoting male persons, such as *sluga* „servant“, *kolega* „colleague“, *sudja* „judge“, etc. In the plural these are inflected like *brat* or *muž*, but in the singular, they follow the pattern of the [second declension](#declension-of-feminine-nouns).

## Declension of neuter nouns
{{ subtitle text='Sklanjanje imennikov srědnjego roda' /}}

Neuter nouns end in **-o** (hard stems) or **-e** (soft stems). Except for the nominative/accusative and the genitive plural, their inflection is identical to that of [inanimate masculine nouns](#declension-of-masculine-nouns). Please note:

- The accusative is always identical to the nominative.
- The nominative/accusative and instrumental singular are affected by the {{ link slug='phonology#o--e' }}o/e rule{{/link}}.
- As for the locative singular, what goes for masculine nouns goes also for neuter nouns: instead of **-u**, it is also possible to write **-ě** after a hard consonant or **-i** after a soft consonant.
- Neuter nouns do not have a vocative separate from the nominative.
- In the genitive plural, neuter nouns of the first declension have a zero ending **-Ø**. In cases when this leads to impossible consonant clusters, an **-e-** is inserted before **-j** or after a soft consonant, or an **-o-** between hard consonants: *okn-o > ok**o**n*, *morj-e > mor**e**j*.

There is also special group of neuter nouns with the ending **-e** (in scientific orthography: **-ę**), for example **ime** „name“ (stem: **imen-**) and **tele** „calf“ (stem: **telęt-**). It also includes a few words on **-o**, for example **nebo** „heaven“ (stem: **nebes-**). In Old Church Slavonic they belonged to a special declension, which nowadays has vanished in most languages. They can be inflected as ordinary neuter nouns (as if their nominatives were *imeno* and *teleto*), they can also be declined according to the more archaic [athematic declension](#athematic-declension).

Because we usually do not distinguish between **ę** and **e**, it is useful to remember that a noun ending in **-e** is always neuter, and as a rule of thumb, when this **-e** is preceded by:

- **m**, then the root is **-men-**: *ime*, gen. *imena*
- a hard consonant, then the root is **-et-**: *tele*, gen. *teleta* (noun of this group usually refer to children or young animals)
- a soft consonant, then the root is **-Ø-**: *morje*, pl. *morja* (in other words, an **-o** noun affected by the o/e rule)

For the rest, declension is always regular. Three examples: **brvno** „log of wood“, **morje** „sea“, **ime** „name“.

{{ svelteComponent name='DeclensionNoun' props='{
	"gender": "neuter",
	"headers": ["Hard", "Soft", "Hard (ę)"],
	"words": ["brvno", "morje", "ime"]
}' options='{}' /}}

## Declension of feminine nouns
{{ subtitle text='Sklanjanje imennikov ženskogo roda' /}}

Most feminine nouns have the ending **-a** and therefore belong to the second declension. Again, we distinguish between hard and soft stems. In the case of feminine nouns the differences between hard and soft declension are not merely a matter of applying the o/e rule. As a rule, the endings **-y** and **-ě** after a hard consonant become **-e** and **-i** after a soft consonant (in other words, they are „reversed“).

Just like in the case of neuter nouns, the zero ending in the genitive plural may require the insertion of a epenthetic vowel **-e-** or **-o-**.

A few words on **-i** belong to this group as well (for example **bogynji**, which is inflected as if the nominative singular were ***bogynja**).

The **-a** declension also includes a number of masculine nouns with the ending **-a** referring to male persons, like **sluga** „servant“ and **sudja** „judge“. They are inflected like *žena* or *zemja* in the singular, but in the plural they follow the pattern of masculine animate nouns: nom.sg. *sluga*, gen.sg. *slugy*, nom.pl. *slugi*, gen.pl. *slugov*, etc.

Another group of feminine nouns are those ending in a consonant. They form the third declension. Most nouns of this category end in **-ost**.

Examples: **žena** „woman“, **zemja** „earth“, **kost** „bone“.

{{ svelteComponent name='DeclensionNoun' props='{
	"gender": "feminine",
	"headers": ["Hard (2nd decl.)", "Soft (2nd decl.)", "3rd decl."],
	"words": ["žena", "zemja", "kost"]
}' options='{}' /}}

## Athematic declension
{{ subtitle text='Atematično sklonjenje' /}}

Except for the regular declensions listed above, Old Church Slavonic also had another declension type, the so-called **athematic declension**. Nouns of this type have gone various ways in the modern Slavic languages, mostly merging into one or more of the regular declension types. Interslavic projects choose various approaches to this group, but some of them preserve it.

This declension type includes nouns of all three genders, but most numerous among them are neuter nouns. The following subtypes can be distinguished:

- masculine nouns on **-enj**, a tiny group including f.ex. *kamenj* „stone“ and *korenj* „root“
- neuter nouns on **-me/-men-**, containing numerous nouns like *ime* „name“, *rame* „shoulder“, *brěme* „burden“
- neuter nouns on **-e/-et-**, referring to children and young animals, f.ex. *tele* „calf“, *prase* „piglet“
- neuter nouns on **-o/-es-**, a group of only a few words, f.ex. *nebo* „heaven“
- feminine nouns on **-ov**, f.ex. *crkov* „church“, *mrkov* „carrot“
- feminine nouns on **-i/-er-**, containing only two nouns: *mati* „mother“ and *doči* „daughter“

[Missing table]

The entire athematic declension can be avoided by inflecting these words according to the regular declensions, as most other Slavic languages do. In that case:

- **kamenj** is inflected like an ordinary masculine noun (gen. *kamenja*, dat. *kamenju*)
- **ime** and **tele** are inflected like *slovo*, as if their nominatives were ***imeno** and ***teleto**: gen. *imena, teleta*, dat. *imenu, teletu*
- **nebo** is inflected like *slovo* too (gen. *neba*, dat. *nebu*)
- **crkov** is inflected like *kost* (gen. *crkvi*); instead of **crkov**, it is also possible to use the form **crkva**, which is inflected lke *žena* (gen. *crkvy*, dat. *crkvě*)
- **mati** is inflected like *kost*: gen./dat. *materi*

## Irregular nouns
{{ subtitle text='Neregularne imenniky' /}}

Interslavic is kept as regular as possible, but a few cases of irregularity cannot be avoided without defying naturalism. The following nouns have an irregular plural (all four inflected like a feminine noun of the **kost** type):

- **člověk** (m.) „human being, person“, pl. **ljudi** „people“
- **děte** (gen. **děteta** or **dětete**) (n.) „child“, pl. **děti** „children“
- **oko** (n.) „eye“, pl. **oči** „eyes“
- **uho** (n.) „ear“, pl. **uši** „ears“

Regular plurals (**člověki**, **oka** etc.) can be used as well, but some of them sound very strange to the Slavic ear, even though they will be understood anyway.

## Indeclinable nouns
{{ subtitle text='Nesklanjane imenniky' /}}

Borrowed international vocabulary ending in **-e**, **-i** or **-u** (f.ex. *alibi, hobi, intervju, kafe, kakao, kliše, menju, tabu, taksi*) and abbreviations are indeclinable. It is not impossible to add case endings anyway, but in that case it is best to separate them from the noun with an apostrophe: **togo alibi'a, te intervju'y, tyh taksi'ov** itd.
