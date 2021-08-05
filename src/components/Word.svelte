<script>
	export let word;
	export let value;
	
	function escapeRegExp(string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}

	let diff = '';
	$: {
		if (value === null) {
			value = '—';
		}
		for (let i = 0; i < value.length; i++) {
			if (value[i] === word[i]) continue;

			diff = value.substring(i);
			if (diff === value) {
				diff = '';
			} else {
				value = value.replace(new RegExp(escapeRegExp(diff) + '$'), '');
			}
			break;
		}
	}
</script>

{value}{#if diff}<strong>{diff}</strong>{/if}