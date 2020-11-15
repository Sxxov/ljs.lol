<script>
	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import Button from '../Button.svelte';
	import Lottie from '../Lottie.svelte';

	export const isActiveWritable = writable(false);

	export let src = '';
	export let animationData = null;
	export let hoverColour = '#0000';
	export let backgroundColour = '#0000';
	export let height = '100%';
	export let width = '100%';
	export let overrideColour = null;

	let animation = null;

	$: isActiveWritable.set(animation?.direction > 0);
	$: animation?.setDirection($isActiveWritable ? 1 : -1), animation?.play();

	const dispatch = createEventDispatcher();
</script>

<component>
	<Button
		{...$$restProps}
		{height}
		{width}
		{backgroundColour}
		{hoverColour}
		isText={false}
		padding='16px 16px'
		roundness='50px'
		on:click={() => {
			isActiveWritable.update((isActive) => !isActive);

			dispatch('click');
		}}
	>
		<Lottie
			{src}
			{animationData}
			{overrideColour}
			options={{
				autoplay: false,
				loop: false,
			}}
			bind:animation
		/>
	</Button>
</component>