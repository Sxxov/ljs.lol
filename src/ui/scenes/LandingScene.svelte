<script>
	import { push, location } from 'svelte-spa-router';
	import { writable } from 'svelte/store';
	import Input from '../blocks/Input.svelte';
	// import Image from '../blocks/Image.svelte';
	import Button from '../blocks/Button.svelte';
	import ConfirmDialog from '../blocks/dialogs/ConfirmDialog.svelte';
	import InputDialog from '../blocks/dialogs/InputDialog.svelte';
	import OkDialog from '../blocks/dialogs/OkDialog.svelte';
	// import Lottie from '../blocks/Lottie.svelte';
	import AppBarScene from '../blocks/scenes/AppBarScene.svelte';
	import HamburgerAppBar from '../blocks/appBars/HamburgerAppBar.svelte';
	import Scene from '../blocks/Scene.svelte';
	import { SMS } from '../../core/sms';
	import contacts from '../../resources/contacts';
	import NavigatorAppBar from '../blocks/appBars/NavigatorAppBar.svelte';
	import Terminal from '../components/Terminal.svelte';
	import { WindowUtility } from '../../resources/utilities';
	import { navigatorAppBarExpandedHeight } from '../../resources/stores';
	import Collage from '../components/Collage.svelte';
	import CallToAction from '../components/CallToAction.svelte';
	import Footer from '../components/Footer.svelte';

	const { innerWritable } = WindowUtility;
	$: inner = $innerWritable;

	const sms = new SMS(contacts.DebugScene);
	sms.send(contacts.RenderScene, 'hello!');

	// const nameInput = null;

	// const strs = [
	// 	'Hello',
	// 	'Warn!',
	// 	'SOMETHING TELAH FUCKED',
	// 	'ok nvm',
	// 	'ok nvm',
	// ];

	// const hintStr = writable(strs[0]);
	// const hintLvl = writable(0);
	// const confirmDialogActive = writable(false);
	// const inputDialogActive = writable(false);
	// const okDialogActive = writable(false);

	// let submitResult = null;

	// let i = 0;
	// setInterval(() => {
	// 	hintStr.set(strs[i]);
	// 	hintLvl.set(i);

	// 	if (i >= 3) {
	// 		i = 0;

	// 		return;
	// 	}
	// 	++i;
	// }, 500);

	const terminalHeightWritable = writable(0);
	$: terminalHeightWritable.set(inner.height - $navigatorAppBarExpandedHeight);
</script>

<Scene
	isPadded={false}
	isInAnimated={true}
	isOutAnimated={true}
>
	<Terminal
		heightWritable={terminalHeightWritable}
	/>

	<Collage />

	<CallToAction />

	<Footer />
	<!-- <container
		style='
			display: flex;
			width: 100%;
			gap: 24px;
			align-items: flex-end;
			justify-content: center;
		'
	> -->
		<!-- <Input 
			label='Name' 
			let:submit
			on:submit={({ detail: value }) => {}}
		>
			<container
				slot='button'
				style='
					flex-shrink: 0;
					flex-grow: 0;
				'
			>
				<Button
					height='100%'
					width='100%'
					on:click={submit}
				>
					Render!
				</Button>
			</container>
		</Input>
	</container> -->
	
	<!-- <Image
		src='https://jiashe.ng/assets/img/placeholder.jpg'
		height='100px'
	/>
	<Input hintWritable={hintStr} hintLevelWritable={hintLvl} /> -->

	<!-- <Button on:click={() => push('/selection/simple')}>SimpleSel</Button>
	<Button on:click={() => confirmDialogActive.set(!$confirmDialogActive)}>Confirm</Button>
	<Button on:click={() => inputDialogActive.set(!$inputDialogActive)}>Input</Button> -->

	<!-- <InputDialog 
		title='what!' 
		isActiveWritable={inputDialogActive}
		on:submit={(result) => {
			submitResult = result.detail;
			okDialogActive.set(!$okDialogActive);
		}}
	>
		<container class='dialog'>
			<icon>error_outline</icon>
			<string>
				the fuck
			</string>
		</container>
	</InputDialog>

	<ConfirmDialog 
		title='wait!' 
		isActiveWritable={confirmDialogActive}
	>
		<container class='dialog'>
			<icon>help_outline</icon>
			<string>
				Are you sure? This can be deadly...
			</string>
		</container>
	</ConfirmDialog>

	<OkDialog 
		title='confirmed!' 
		isActiveWritable={okDialogActive}
	>
		<container class='dialog'>
			<icon>help_outline</icon>
			<string>
				{submitResult} was confirmed.
			</string>
		</container>
	</OkDialog> -->

	<!-- <Lottie
		src='https://assets2.lottiefiles.com/packages/lf20_wxUJzo.json'
	/> -->
</Scene>

<style>
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