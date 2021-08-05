<div class="vowel-chart u-table-wrapper">
	<table class="vowel-chart-table">
		<caption class="sr-only">IPA vowel chart for Interslavic language</caption>
		<thead>
			<tr>
				<th scope="col"><span class="sr-only">Vowel type</span></th>
				<th scope="col">Front</th>
				<th scope="col">Near-front</th>
				<th scope="col">Central</th>
				<th scope="col">Near-back</th>
				<th scope="col">Back</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Close</th>
				<td><span class="vowel vowel-close-front"><b>i</b> [i]</span></td>
				<td colspan="3" aria-hidden="true"></td>
				<td><span class="vowel vowel-close-back"><b>u</b> [u]</span></td>
			</tr>
			<tr>
				<th scope="row">Near-close</th>
				<td aria-hidden="true"></td>
				<td><span class="vowel vowel-nearclose-nearfront"><b>y</b> [ɪ]</span></td>
				<td aria-hidden="true"></td>
				<td><span class="sr-only">Only etymological: </span><span class="vowel vowel-nearclose-nearback vowel-etymological"><b>ų</b> [ʊ]</span></td>
			</tr>
			<tr aria-hidden="true">
				<th scope="row">Close-mid</th>
			</tr>
			<tr>
				<th scope="row">Mid</th>
				<td colspan="2" aria-hidden="true"></td>
				<td><span class="sr-only">Only etymological: </span><span class="vowel vowel-closemid-central vowel-etymological"><b>ė, ȯ</b> [ə]</span></td>
			</tr>
			<tr>
				<th scope="row">Open-mid</th>
				<td><span class="vowel vowel-openmid-front"><b>e</b> [ɛ] <br> <b>ě</b> [jɛ]</span></td>
				<td colspan="3" aria-hidden="true"></td>
				<td><span class="vowel vowel-openmid-back"><b>o</b> [ɔ]</span></td>
			</tr>
			<tr>
				<th scope="row">Near-open</th>
				<td><span class="sr-only">Only etymological: </span><span class="vowel vowel-nearopen-front vowel-etymological"><b>ę</b> [jæ]</span></td>
			</tr>
			<tr>
				<th scope="row">Open</th>
				<td><span class="vowel vowel-open-front"><b>a</b> [a]</span></td>
				<td colspan="3" aria-hidden="true"></td>
				<td><span class="sr-only">Only etymological: </span><span class="vowel vowel-open-back vowel-etymological"><b>å</b> [ɒ]</span></td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	.vowel-chart-table {
		background-image: url(//upload.wikimedia.org/wikipedia/commons/4/4f/Blank_vowel_trapezoid.svg);
		background-size: auto 90%;
		background-position: bottom right -2em;
		background-repeat: no-repeat;
		table-layout: fixed;
		white-space: nowrap;
		min-width: 30em;
	}

	.vowel-chart tbody :global(tr) {
		vertical-align: middle;
		height: 3em;
	}

	.vowel-chart-table :global(td) {
		text-align: center;
	}

	/* Individual vowels */
	.vowel {
		background: #fff;
		box-shadow: 0 0 0 2px #fff;
		display: inline-block;
		position: relative;
		padding: 0 0.25em;
	}

	.vowel-etymological {
		color: #555;
	}

	/* Vowel positioning */
	.vowel-close-front {
		transform: translateX(-3em);
	}

	.vowel-closemid-central {
		transform: translateX(1em);
	}

	.vowel-openmid-front {
		transform: translateX(5em);
	}

	.vowel-nearopen-front {
		transform: translateX(7em);
	}

	.vowel-open-front {
		transform: translateX(9em);
	}
</style>