<script>
	// import Button from "$lib/components/Button.svelte";
	import { Button } from '$lib';
import Tailwind from '$lib/components/Tailwind.svelte';

</script>

<Tailwind
	config={{
		theme: {
			extend: {
				colors: {
					brand: '#007291'
				}
			}
		}
	}}
>
	<h1>hallo</h1>
    <Button href="#" class="md:text-black p-20">Klik hier</Button>
</Tailwind>
