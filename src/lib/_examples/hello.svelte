<script>
	import { Button, Hr, Html, Text } from '$lib';

	export let name = 'World';
</script>

<Html lang="en">
	<Text>
		Hello, {name}!
	</Text>
	<Hr />
	<Button href="https://svelte.dev">Visit Svelte</Button>
</Html>