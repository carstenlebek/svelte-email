<script lang="ts">
	import type { StandardLonghandProperties } from 'csstype';
	import { styleToString } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLHRElement>, 'style'> {
		style?: StandardLonghandProperties;
	}

	export let style: $$Props['style'] = {};

	const styleDefault = {
		width: '100%',
		border: 'none',
		borderTop: '1px solid #eaeaea',
		...style
	};
</script>

<hr style={styleToString(styleDefault)} {...$$restProps} />
