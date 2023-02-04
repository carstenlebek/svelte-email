<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<iframe srcdoc={data.html} height="800"></iframe> 