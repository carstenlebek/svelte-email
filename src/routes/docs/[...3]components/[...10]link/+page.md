# Link

A hyperlink to web pages, email addresses, or anything else a URL can address.

## Usage

```svelte
<script>
	import { Link } from 'svelte-email';
</script>

<Link href="https://svelte.dev">Svelte</Link>
```

## Props

<script>
	import { Chip } from '@svelteness/kit-docs';
</script>

| Name                | Type     | Required | Default  | Description                      |
| ------------------- | -------- | -------- | -------- | -------------------------------- |
| <Chip>href</Chip>   | `string` | `true`   |          | The URL to link to               |
| <Chip>target</Chip> | `string` | `false`  | `_blank` | The target attribute of the link |
