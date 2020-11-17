<script>
	import { writable } from 'svelte/store';
	import { navigatorAppBarExpandedHeight } from '../../resources/stores';

	import { CSSUtility, WindowUtility } from '../../resources/utilities';

	import Button from '../blocks/Button.svelte';

	/** @type {Record<string, () => void>} */
	export let keyAndCallbackMap;

	const keys = Object.keys(keyAndCallbackMap);
	const callbacks = Object.values(keyAndCallbackMap);

	const { innerWritable } = WindowUtility;
	$: inner = $innerWritable;
	const componentHeightWritable = writable(0);
	$: componentHeightWritable.set(inner.height - $navigatorAppBarExpandedHeight);
</script>

<component
	style='
		--height: {CSSUtility.parse($componentHeightWritable)}
	'
>
	{#each keys as key, i}
		<container>
			<Button
				icon='arrow_forward'
				height='100%'
				width='100%'
				on:click={callbacks[i]}
				roundness='0'
			>
				<heading>
					{key}
				</heading>
			</Button>
		</container>
	{/each}
</component>

<style>
	component {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		grid-template-rows: 1fr;

		height: var(--height);
		width: 100%;

		/* gap: var(--padding); */
		/* padding: var(--padding); */
		box-sizing: border-box;
	}
</style>

