<script>
	import { writable } from 'svelte/store';
	import Scene from '../blocks/Scene.svelte';
	import { SMS } from '../../core/sms';
	import contacts from '../../resources/contacts';
	import Lottie from '../blocks/Lottie.svelte';
	import Terminal from '../components/Terminal.svelte';
	import { WindowUtility } from '../../resources/utilities';
	import { navigatorAppBarExpandedHeight } from '../../resources/stores';
	import Collage from '../components/Collage.svelte';
	import CallToAction from '../components/CallToAction.svelte';
	import Footer from '../components/Footer.svelte';
	import BackgroundHeading from '../components/BackgroundHeading.svelte';

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
	<container
		class='background-heading'
	>
		<BackgroundHeading
			textAlign='left'
			index=0
		>
			<span slot='fill'>
				hell
				o,
			</span>
			<span slot='outline'>
				hey...
				yo!
			</span>
		</BackgroundHeading>
		<BackgroundHeading
			textAlign='right'
			index=1
		>
			<span slot='fill'>
				what
				up?
			</span>
			<span slot='outline'>
				yeah,
				you!
			</span>
		</BackgroundHeading>
		<BackgroundHeading
			textAlign='left'
			index=2
		>
			<span slot='fill'>
				<br>
				{@html 
					`would
					you
					like
					to
					know
					me
					?`
				}
			</span>
		</BackgroundHeading>
		<BackgroundHeading
			textAlign='right'
			index=3
		>
			<span slot='outline'>
				i
				do
				hope
				you'll
				stick
				around
				:*
			</span>
		</BackgroundHeading>
	</container>
	
	<container
		class='terminal'
	>
		<Terminal
			heightWritable={terminalHeightWritable}
		/>
	</container>

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

		<Collage
			minimumColumns='3'
		/>
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

		z-index: 0;
	}

	container.terminal {
		height: 100%;
		width: 100%;

		z-index: 2;
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

	container.background-heading {
		z-index: 1;
		/* top: 0; */

		position: absolute;

		width: 100%;

		mix-blend-mode: difference;
	}
</style>