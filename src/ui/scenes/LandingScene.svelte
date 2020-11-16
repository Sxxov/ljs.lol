<script>
	import { writable } from 'svelte/store';
	import Scene from '../blocks/Scene.svelte';
	import { SMS } from '../../core/sms';
	import contacts from '../../resources/contacts';
	import Lottie from '../blocks/Lottie.svelte';
	import Terminal from '../components/Terminal.svelte';
	import { WindowUtility, $ as S } from '../../resources/utilities';
	import { navigatorAppBarExpandedHeight } from '../../resources/stores';
	import Collage from '../components/Collage.svelte';
	import CallToAction from '../components/CallToAction.svelte';
	import Footer from '../components/Footer.svelte';

	const { innerWritable } = WindowUtility;
	$: inner = $innerWritable;

	const sms = new SMS(contacts.DebugScene);
	sms.send(contacts.RenderScene, 'hello!');

	const terminalHeightWritable = writable(0);
	$: terminalHeightWritable.set(inner.height - $navigatorAppBarExpandedHeight);

	let animationCurrentFrameWritable = writable(0);
	let animation = null;
	let lottieContainerDomContent = null;

	let scrollY = 0;

	$: onScroll(scrollY);

	function onScroll(y) {
		if (!lottieContainerDomContent) {
			return;
		}

		const { top } = lottieContainerDomContent.getBoundingClientRect();

		const currentFrame = Math.max(
			animation?.totalFrames
			- (
				y / 8
				- top
			),
			-1,
		);
	
		animationCurrentFrameWritable.set(currentFrame);
	}

	// $: console.log($animationCurrentFrameWritable);
</script>

<svelte:window bind:scrollY />

<Scene
	isPadded={false}
	isInAnimated={true}
	isOutAnimated={true}
>
	<Terminal
		heightWritable={terminalHeightWritable}
	/>

	<container
		class='collage'
	>
		<container 
			class='lottie'
			bind:this={lottieContainerDomContent}
		>
			<Lottie 
				bind:animationCurrentFrameWritable
				bind:animation
				overrideColour='--colour-background-primary'
				animationData={import('../../raw/lottie/blocks.json')}
			/>
		</container>

		<Collage />
	</container>

	<CallToAction />

	<Footer />
</Scene>

<style>
	container.lottie {
		width: 100%;
		height: 100vh;
		position: absolute;
		/* top: 0; */

		/* to be above collage, not sure why it's 21 though (collage goes up to 40) */
		z-index: 21;
		/* transform: rotate(180deg); */
	}

	container.collage {
		width: 100%;
	}
	/* container.dialog {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	container.dialog > icon {
		display: block;
		flex-shrink: 0;
		font-size: 1.5rem;
		width: 3rem;
	} */
</style>