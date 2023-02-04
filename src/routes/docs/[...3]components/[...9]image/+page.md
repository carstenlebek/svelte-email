# Image

Display an image in your email.

## Usage

```svelte
<script>
	import { Img } from 'svelte-email';
</script>

<Img
	src="https://svelte.dev/svelte-logo-horizontal.png"
	alt="Svelte logo"
	width="200"
	height="50"
/>
```

:::admonition type="tip"
All email clients can display .png, .gif, and .jpg images. Unfortunately, .svg images are not well supported, regardless of how they’re referenced, so avoid using these. See [Can I Email](https://www.caniemail.com/features/image-svg/) for more information.
:::

## Props

<script>
	import { Chip } from '@svelteness/kit-docs';
</script>

| Name                | Type     | Required | Description                         |
| ------------------- | -------- | -------- | ----------------------------------- |
| <Chip>alt</Chip>    | `string` | `false`  | The alternative text for the image. |
| <Chip>src</Chip>    | `string` | `true`   | The image source.                   |
| <Chip>width</Chip>  | `string` | `true`   | The image width.                    |
| <Chip>height</Chip> | `string` | `true`   | The image height.                   |
| <Chip>style</Chip>  | `object` | `false`  | The image style.                    |
