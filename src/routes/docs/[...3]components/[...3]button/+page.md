# Button

A link that is styled to look like a button.

## Usage

```svelte
<script>
	import { Button } from 'svelte-email';
</script>

<Button href="https://example.com" style={{ color: '#61dafb' }}>
	Click me
</Button>
```

## Props

<script>
	import { Chip } from '@svelteness/kit-docs';
</script>

| Name                | Type     | Required | Default  | Description                       |
| ------------------- | -------- | -------- | -------- | --------------------------------- |
| <Chip>href</Chip>   | `string` | `true`   |          | The URL to link to                |
| <Chip>style</Chip>  | `object` | `false`  |          | The CSS styles for the link       |
| <Chip>target</Chip> | `string` | `false`  | `_blank` | The target attribute for the link |
