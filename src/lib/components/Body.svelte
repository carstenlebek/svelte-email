<script lang="ts">
	import { styleToString } from '$lib/utils';

	export let style: Record<string, string | number> = {};
</script>

<body {...$$restProps} style={styleToString(style)}>
	<slot />
</body>
