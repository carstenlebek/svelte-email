<script lang="ts">
	import { styleToString } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
		style?: Record<string, string | number | null>;
	}

	export let style: $$Props['style'] = {};

	const styleDefault = {
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		...style
	};
</script>

<td style={styleToString(styleDefault)} role="presentation" {...$$restProps}>
	<slot />
</td>
