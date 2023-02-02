<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<iframe
	title="Email preview"
	srcdoc={data.document}
	style="width: 100%; height: 600px; border: none;"
/>
