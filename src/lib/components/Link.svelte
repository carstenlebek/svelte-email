<script lang="ts">
	import type { StandardLonghandProperties } from 'csstype';
	import { styleToString } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLAnchorElement>, 'style'> {
		style?: StandardLonghandProperties;
		target?: string;
		href: string;
	}

	export let style: $$Props['style'] = {};
	export let target = '_blank';
	export let href = '';

	const styleDefault = {
		color: '#067df7',
		textDecoration: 'none',
		...style
	};
</script>

<a {...$$restProps} {href} {target} style={styleToString(styleDefault)}>
	<slot />
</a>
