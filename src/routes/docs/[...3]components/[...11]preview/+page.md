# Preview

A preview text that will be displayed in the inbox of the recipient.

:::admonition type="info"
Email clients have this concept of “preview text” which gives insight into what’s inside the email before you open. A good practice is to keep that text under 90 characters.
:::

## Usage

```svelte
<script>
	import { Preview } from 'svelte-email';
</script>

<Preview preview="Welcome to svelte-email" />
```

## Props

<script>
	import { Chip } from '@svelteness/kit-docs';
</script>

| Name                 | Type     | Required | Default | Description      |
| -------------------- | -------- | -------- | ------- | ---------------- |
| <Chip>preview</Chip> | `string` | `true`   |         | The preview text |
