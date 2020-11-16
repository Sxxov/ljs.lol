<script>
	import { writable } from 'svelte/store';
	import { onMount, createEventDispatcher, onDestroy } from 'svelte';
	import strings from '../../resources/strings';
	import { Shadow } from '../../core/shadow';
	import { CSSUtility } from '../../resources/utilities';

	export let src;
	export let alt = '';

	export let height = '100%';
	export let width = '100%';

	export let heightWritable = writable(height);
	export let widthWritable = writable(width);

	export let placeholderColour = '--colour-accent-primary';

	(async () => {
		if (!src.then) {
			return;
		}

		let result = null;

		result = await Promise.resolve(src);

		if (result.default != null) {
			realSrc = result.default;

			return;
		}

		realSrc = result;
	})();

	let realSrc = '';
	let imgDomContent = null;
	let componentDomContent = null;
	let isActive = false;
	const depth = 0;
	const dispatch = createEventDispatcher();

	if (!src) {
		window.warn(strings.ui.blocks.image.warn.NO_SRC, 'Image');
	}

	onMount(() => {
		Shadow.apply(depth, componentDomContent);
	
		if (imgDomContent.readyState === 4) {
			onLoad();

			return;
		}

		imgDomContent.addEventListener('load', onLoad);
	});

	onDestroy(() => {
		imgDomContent.removeEventListener('load', onLoad);
	});

	function onLoad() {
		isActive = true;
		dispatch('load');
	}
</script>

<component
	style='
			--width: {CSSUtility.parse($widthWritable)};
			--height: {CSSUtility.parse($heightWritable)};
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
		src={realSrc}
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



