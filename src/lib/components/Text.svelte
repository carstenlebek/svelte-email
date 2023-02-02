<script lang="ts">
	import type { StandardLonghandProperties } from 'csstype';
	import { styleToString } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLParagraphElement>, 'style'> {
		style?: StandardLonghandProperties;
	}

	export let style: $$Props['style'] = {};

	const styleDefault = {
		fontSize: '14px',
		lineHeight: '24px',
		margin: '16px 0',
		...style
	};
</script>

<p style={styleToString(styleDefault)} {...$$restProps}>
	<slot />
</p>
