<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Router from 'svelte-spa-router';
	import { wrap } from 'svelte-spa-router/wrap';
	import { navigatorAppBarScrolledHeight, navigatorAppBarBaseHeight } from './resources/stores';
	import LandingScene from './ui/scenes/LandingScene.svelte';
	import strings from './resources/strings';
	import { Compatibler } from './core/compatibler';
	import RenderScene from './ui/scenes/RenderScene.svelte';
	import { ScrollUtility } from './resources/utilities';
	import NavigatorAppBar from './ui/blocks/appBars/NavigatorAppBar.svelte';

	Compatibler.throw(Compatibler.test());

	let mainDomContent = null;
	let scrolledHeightWritable = writable(0);
	let baseHeightWritable = writable(0);

	$: navigatorAppBarScrolledHeight.set($scrolledHeightWritable);
	$: navigatorAppBarBaseHeight.set($baseHeightWritable);

	// const GlobalProps = {
	// 	appBarScrolledHeightWritable,
	// 	appBarBaseHeightWritable,
	// };
	const Paths = [
		'/',
		'/about',
		'/contact',
		'/portfolio',
	];
	const Routes = {
		[Paths[0]]: LandingScene,
		[Paths[1]]: RenderScene,
		[Paths[2]]: RenderScene,
		[Paths[3]]: RenderScene,
	};
	window.RouteNames = {
		[Paths[0]]: strings.common.routes.info.HOME,
		[Paths[1]]: strings.common.routes.info.ABOUT,
		[Paths[2]]: strings.common.routes.info.CONTACT,
		[Paths[3]]: strings.common.routes.info.PORTFOLIO,
	};
	const { RouteNames } = window;

	onMount(() => {
		ScrollUtility.target = mainDomContent;
	});

	// const compiledRoutes = (() => {
	// 	const result = {};

	// 	Object.keys(Routes).forEach((routeKey) => {
	// 		const routeValue = Routes[routeKey];

	// 		result[routeKey] = wrap({
	// 			component: routeValue,
	// 			props: GlobalProps,
	// 		});
	// 	});

	// 	return result;
	// })();
</script>

<main
	bind:this={mainDomContent}
>
	<NavigatorAppBar
		bind:scrolledHeightWritable
		bind:baseHeightWritable
		routes={RouteNames}
	/>
	<Router
		routes={Routes}
	/>
</main>

<style>
	main {
		height: 100%;
		background: var(--colour-background-primary);
	}
</style>