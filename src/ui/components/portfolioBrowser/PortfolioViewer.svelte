<script>
	export let html;

	let componentDomContent = null;
	let resolvedHtml = '';

	(async () => {
		if (html.then) {
			resolvedHtml = (await Promise.resolve(html)).default;

			return;
		}

		resolvedHtml = html;
	})();
</script>

<component
	bind:this={componentDomContent}
>
	{@html resolvedHtml}
</component>

<style>
	component {
		height: 100%;
		width: 100%;
	}
</style>