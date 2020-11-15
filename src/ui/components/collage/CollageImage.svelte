<script>
	import Image from '../../blocks/Image.svelte';

	// TODO: not hardcode this shit
	const CHOICES = new Array(12).fill(null).map((_, i) => `/raw/img/collage/${i}.jpg`);

	const src = CHOICES[Math.floor(Math.random() * (CHOICES.length - 1))];
</script>

<Image
	{src}
	{...$$restProps}
/>