<script lang="ts">
	import type { StandardLonghandProperties } from 'csstype';
	import { styleToString } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLBodyElement>, 'style'> {
		style?: StandardLonghandProperties;
	}

	export let style = {};
</script>

<body {...$$restProps} style={styleToString(style)}>
	<slot />
</body>
