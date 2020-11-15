<script>
	import lottie from 'lottie-web';
	import { onMount } from 'svelte';
	import { CSSUtility } from '../../resources/utilities';

	export let src = '';
	export let animationData = null;
	export let height = '100%';
	export let width = '100%';
	export let options = {};
	export let overrideColour = null;

	let containerDomContent = null;
	export let animation = null;

	onMount(async () => {
		const json = animationData || (!src ? {} : await (await fetch(src)).json());

		animation = lottie.loadAnimation({
			container: containerDomContent,
			animationData: json,
			autoplay: true,
			loop: true,
			...options,
		});
	});
</script>

<component
	style='
		--height: {CSSUtility.parse(height)};
		--width: {CSSUtility.parse(width)};
	'
>
	<container
		bind:this={containerDomContent}
		class='{overrideColour ? 'override' : ''}'
		style='
			--colour-override: {CSSUtility.parse(overrideColour)}
		'
	>
</component>

<style>
	component {
		height: var(--height);
		width: var(--width);

		overflow: hidden;
	}

	container.override :global(*) {
		fill: var(--colour-override);
		stroke: var(--colour-override);
	}

	/* :global(.lottie-player) {
		top: 50%;
    	transform: translateY(-50%);
	} */
</style>