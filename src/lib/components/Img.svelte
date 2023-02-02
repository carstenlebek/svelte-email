<script lang="ts">
	import { styleToString } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLImageElement>, 'style'> {
		style?: Record<string, string | number | null>;
		alt: string;
		src: string;
		width: string;
		height: string;
	}

	export let style = {};
	export let alt = '';
	export let src = '';
	export let width = '0';
	export let height = '0';

	const styleDefault = {
		display: 'block',
		outline: 'none',
		border: 'none',
		textDecoration: 'none',
		...style
	};
</script>

<img {alt} {src} {width} {height} style={styleToString(styleDefault)} {...$$restProps} />
