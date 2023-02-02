<script lang="ts">
	import { styleToString } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLBodyElement>, 'style'> {
		style?: Record<string, string | number | null>;
	}

	export let style = {};
</script>

<body {...$$restProps} style={styleToString(style)}>
	<slot />
</body>
