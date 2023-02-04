# Render

Transform Svelte components into HTML email templates.

## 1. Create an email using Svelte

```svelte title="src/$lib/emails/Hello.svelte"
<script>
	import { Button, Hr, Html, Text } from 'svelte-email';

	export let name = 'World';
</script>

<Html lang="en">
	<Text>
		Hello, {name}!
	</Text>
	<Hr />
	<Button href="https://svelte.dev">Visit Svelte</Button>
</Html>
```

## 2. Convert to HTML

```js title="src/routes/emails/hello/+server.js"
import { json } from '@sveltejs/kit';
import { render } from 'svelte-email';
import Hello from '$lib/emails/Hello.svelte';

export function GET() {
	const html = render({
		template: Hello,
		props: {
			name: 'World'
		}
	});

	return json({
		html
	});
}
```

This will return the following HTML:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html id="__svelte-email" lang="en">
	<head></head>
	<body>
		<p style="font-size:14px;line-height:24px;margin:16px 0;">Hello, World!</p>
		<hr style="width:100%;border:none;border-top:1px solid #eaeaea;" />
		<a
			href="https://svelte.dev"
			target="_blank"
			style="p-x:0;p-y:0;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;padding:0px 0px;"
		>
			<span>
				<!-- HTML_TAG_START --><!--[if mso
					]><i style="letter-spacing: 0px;mso-font-width:-100%;mso-text-raise:0" hidden>&nbsp;</i><!
				[endif]--><!-- HTML_TAG_END -->
			</span>
			<span
				style="p-x:0;p-y:0;max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:0;"
			>
				Visit Svelte
			</span>
			<span>
				<!-- HTML_TAG_START --><!--[if mso
					]><i style="letter-spacing: 0px;mso-font-width:-100%" hidden>&nbsp;</i><!
				[endif]--><!-- HTML_TAG_END -->
			</span>
		</a>
	</body>
</html>
```

## 3. Convert to plain text

Plain text versions of emails are important because they ensure that the message can be read by the recipient even if they are unable to view the HTML version of the email.

This is important because not all email clients and devices can display HTML email, and some recipients may have chosen to disable HTML email for security or accessibility reasons.

Here’s how to convert a Svelte component into plain text.

```js title="src/routes/emails/hello/+server.js"
import { json } from '@sveltejs/kit';
import { render } from 'svelte-email';
import Hello from '$lib/emails/Hello.svelte';

export function GET() {
	const text = render({
		template: Hello,
		props: {
			name: 'World'
		},
		options: {
			plainText: true
		}
	});

	return json({
		text
	});
}
```

This will return the following plain text:

```text
Hello, World!

--------------------------------------------------------------------------------

Visit Svelte [https://svelte.dev]
```

## Options

<script>
	import { Chip } from '@svelteness/kit-docs';
</script>

| Name                   | Type      | Description                      |
| ---------------------- | --------- | -------------------------------- |
| <Chip>plainText</Chip> | `boolean` | Convert the email to plain text. |
| <Chip>pretty</Chip>    | `boolean` | Pretty print the HTML.           |
