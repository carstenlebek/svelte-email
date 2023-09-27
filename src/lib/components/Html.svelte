<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLHtmlElement>, 'style'> {
		lang?: string;
		useTailwind?: "yes" | "no"
	}

	export let lang = 'en';
	export let useTailwind = "yes"

</script>

<html {...$$restProps} id="__svelte-email" {lang} data-tw={useTailwind}>
	<slot />
</html>
