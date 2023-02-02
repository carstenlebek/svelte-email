<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLHtmlElement>, 'style'> {
		lang?: string;
	}

	export let lang = 'en';
</script>

<html {...$$restProps} id="__svelte-email" {lang}>
	<slot />
</html>
