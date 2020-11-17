<script>
	import Router, { push } from 'svelte-spa-router';
	import { wrap } from 'svelte-spa-router/wrap';

	import Scene from '../blocks/Scene.svelte';
	import CallToAction from '../components/CallToAction.svelte';
	import Footer from '../components/Footer.svelte';
	import PortfolioBrowser from '../components/PortfolioBrowser.svelte';
	import PortfolioViewer from '../components/portfolioBrowser/PortfolioViewer.svelte';

	// get rid of warning (wtf)
	export let params = null; params;

	const PREFIX = '/portfolio';
	const CCTSRoutes = {
		'/ccts': wrap({
			component: PortfolioBrowser,
			props: {
				keyAndCallbackMap: {
					1: () => href('/ccts/1'),
					2: () => href('/ccts/2'),
					3: () => href('/ccts/3'),
				},
			},
		}),
		'/ccts/1': wrap({
			component: PortfolioViewer,
			props: {
				html: import('../../raw/mdx/ccts/1.mdx'),
			},
		}),
		'/ccts/2': wrap({
			component: PortfolioViewer,
			props: {
				html: 'ccts/2',
			},
		}),
		'/ccts/3': wrap({
			component: PortfolioViewer,
			props: {
				html: 'ccts/3',
			},
		}),
	};
	const PhotoRoutes = {
		'/photo': wrap({
			component: PortfolioBrowser,
			props: {
				keyAndCallbackMap: {
					1: () => href('/ccts/1'),
					2: () => href('/ccts/2'),
					3: () => href('/ccts/3'),
				},
			},
		}),
		'/photo/1': wrap({
			component: PortfolioViewer,
			props: {
				html: 'ccts/1',
			},
		}),
		'/photo/2': wrap({
			component: PortfolioViewer,
			props: {
				html: 'ccts/2',
			},
		}),
		'/photo/3': wrap({
			component: PortfolioViewer,
			props: {
				html: 'ccts/3',
			},
		}),
	};
	const Routes = {
		'/': wrap({
			component: PortfolioBrowser,
			props: {
				keyAndCallbackMap: {
					CCTS: () => href('/ccts'),
					PHOTO: () => href('/photo'),
				},
			},
		}),
		...CCTSRoutes,
		...PhotoRoutes,
	};

	function href(html) {
		push(`${PREFIX}${html}`);
	}
</script>

<Scene
	isInAnimated={true}
	isOutAnimated={true}
	isPadded={false}
	align='center'
	justify='center'
>
	<Router
		prefix={PREFIX}
		routes={Routes}
	/>
	<!-- <CallToAction /> -->
	<Footer />
</Scene>