<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { styleToString } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLBodyElement>, 'style'> {
		style?: StandardLonghandProperties & StandardShorthandProperties & StandardProperties;
	}

	export let style = {};
	let className: string | undefined = undefined;
	export { className as class };
</script>

<body {...$$restProps} style={styleToString(style)} class={className} >
	<slot />
</body>
