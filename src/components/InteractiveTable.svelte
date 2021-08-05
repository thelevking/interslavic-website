<script>
	export let value;
	export let onFormSubmit = () => {};
	
	import { onMount } from 'svelte';

	let tableWrapper;

	// Use passed function and add other events
	function submitAction(event) {
		event.preventDefault();

		onFormSubmit(event);

		tableWrapper.focus();
	}
	
	// Make form fields interactive on mount
	let jsDisabled = true;
	onMount(() => {
		jsDisabled = false;
	});
</script>

<div class="interactive-table">
	<div class="interactive-table-content u-table-wrapper" tabindex="-1" bind:this={tableWrapper}>
		<table>
			<slot name="caption">
				<caption>
					<strong>Error:</strong> Table has no caption.
				</caption>
			</slot>
			{#if $$slots.thead}
			<thead>
				<slot name="thead"></slot>
			</thead>
			{/if}
			<slot name="tbody">
				<tbody>
					<tr>
						<td><strong>Error:</strong> Table has no contents.</td>
					</tr>
				</tbody>
			</slot>
		</table>
	</div>
	<form on:submit={submitAction}>
		<div class="interactive-table-form">
			<div>
				<label class="label">
					<span class="label-value sr-only">Choose a word</span>
					<input class="label-input" type="text" name="value" {value} disabled={jsDisabled}>
				</label>
			</div>
			<div>
				<button type="submit" disabled={jsDisabled}>Choose</button>
			</div>
		</div>
	</form>
</div>

<style>
	.interactive-table {
		font-family: sans-serif;
		font-family: var(--font-sans-serif);
		margin: 0 -1em;
	}

	:global(.javascript) .interactive-table {
		outline: 2px dashed #ccc;
	}

	/* Form */
	.interactive-table-form {
		background: #eee;
		box-shadow: 0 1px #ccc, 1px 0 #ccc, -1px 0 #ccc;
		display: none;
		padding: 0.5em 1em;
	}

	:global(.javascript) .interactive-table-form {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}

	/* Table content */
	.interactive-table-content {
		padding: 0.25em 1em;
	}
</style>
