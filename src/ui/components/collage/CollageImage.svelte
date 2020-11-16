<script>
	import Image from '../../blocks/Image.svelte';

	let src = '';

	(async () => {
		// TODO: not hardcode this shit
		const CHOICES = [
			import('../../../raw/img/collage/0.jpg'),
			import('../../../raw/img/collage/1.jpg'),
			import('../../../raw/img/collage/2.jpg'),
			import('../../../raw/img/collage/3.jpg'),
			import('../../../raw/img/collage/4.jpg'),
			import('../../../raw/img/collage/5.jpg'),
			import('../../../raw/img/collage/6.jpg'),
			import('../../../raw/img/collage/7.jpg'),
			import('../../../raw/img/collage/8.jpg'),
			import('../../../raw/img/collage/9.jpg'),
			import('../../../raw/img/collage/10.jpg'),
			import('../../../raw/img/collage/11.jpg'),
			import('../../../raw/img/collage/12.jpg'),
		];

		src = CHOICES[Math.floor(Math.random() * (CHOICES.length - 1))];
	})();
</script>

{#if src}
	<Image
	{src}
	{...$$restProps}
	/>
{/if}