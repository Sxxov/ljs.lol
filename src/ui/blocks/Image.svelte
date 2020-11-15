<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import strings from '../../resources/strings';
	import { Shadow } from '../../core/shadow';
	import { CSSUtility } from '../../resources/utilities';

	export let src;
	export let alt = '';
	export let width = '100%';
	export let height = '100%';
	export let placeholderColour = '--colour-accent-primary';

	let imgDomContent = null;
	let componentDomContent = null;
	let isActive = false;
	const depth = 0;
	const dispatch = createEventDispatcher();

	onMount(() => {
		Shadow.apply(depth, componentDomContent);

		if (!src) {
			window.warn(strings.ui.Image.warn.NO_SRC, 'Image');

			return;
		}
	
		if (imgDomContent.readyState === 4) {
			onLoad();

			return;
		}

		imgDomContent.addEventListener('load', onLoad);
	});

	function onLoad() {
		isActive = true;
		dispatch('load');
	}
</script>

<component
	style='
			--width: {CSSUtility.parse(width)};
			--height: {CSSUtility.parse(height)};
		'
	bind:this={componentDomContent}
>
	<div 
		class='background'
		style='
			--colour-placeholder: {placeholderColour};
		'
	></div>
	<img
		{src}
		{alt}
		class={isActive ? '' : 'inactive'}
		draggable='false'
		bind:this={imgDomContent}
	>
</component>

<style>
	component {
		position: relative;

		height: var(--height);
		width: var(--width);
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;

		height: var(--height);
		width: var(--width);

		background: var(--colour-placeholder);
	}

	img {
		position: absolute;
		top: 0;
		left: 0;

		height: var(--height);
		width: var(--width);

		opacity: 1;

		object-fit: cover;

		transition: 0.3s var(--ease-slow-slow);
	}

	component::after {
		content: '';

		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;

		box-shadow: var(--shadow);
	}

	img.inactive {
		opacity: 0;
	}
</style>



