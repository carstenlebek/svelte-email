# Heading

A block of heading text.

## Usage

```svelte
<script>
	import { Heading } from 'svelte-email';
</script>

<Heading as="h1">Hello world</Heading>
```

## Props

<script>
	import { Chip } from '@svelteness/kit-docs';
</script>

| Name            | Type     | Required | Default | Description                                                                                                              |
| --------------- | -------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| <Chip>as</Chip> | `string` | `true`   | `h1`    | Render component as <Chip>h1</Chip>, <Chip>h2</Chip>, <Chip>h3</Chip>, <Chip>h4</Chip>, <Chip>h5</Chip>, <Chip>h6</Chip> |
| <Chip>m</Chip>  | `string` | `false`  |         | A shortcut for the <Chip>margin</Chip> CSS property                                                                      |
| <Chip>mx</Chip> | `string` | `false`  |         | A shortcut for the <Chip>margin-left</Chip> and <Chip>margin-right</Chip> CSS properties                                 |
| <Chip>my</Chip> | `string` | `false`  |         | A shortcut for the <Chip>margin-top</Chip> and <Chip>margin-bottom</Chip> CSS properties                                 |
| <Chip>mt</Chip> | `string` | `false`  |         | A shortcut for the <Chip>margin-top</Chip> CSS property                                                                  |
| <Chip>mr</Chip> | `string` | `false`  |         | A shortcut for the <Chip>margin-right</Chip> CSS property                                                                |
| <Chip>mb</Chip> | `string` | `false`  |         | A shortcut for the <Chip>margin-bottom</Chip> CSS property                                                               |
| <Chip>ml</Chip> | `string` | `false`  |         | A shortcut for the <Chip>margin-left</Chip> CSS property                                                                 |
