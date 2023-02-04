# Head

Contains head components, related to the document such as style and meta elements.

## Usage

```svelte
<script>
	import { Head } from 'svelte-email';
</script>

<Head>
	<title>My email</title>
	<meta name="description" content="My email description" />
	<style>
		/* ... */
	</style>
</Head>
```