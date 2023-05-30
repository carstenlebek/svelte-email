# Usage

## Creating email templates

Create a new email template in the `src/$lib/emails` directory:

```svelte title="src/$lib/emails/welcome.svelte"|copy
<script lang="ts">
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

	export let firstName = 'John';

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const main = {
		backgroundColor: '#ffffff'
	};

	const container = {
		margin: '0 auto',
		padding: '20px 0 48px'
	};

	const logo = {
		margin: '0 auto'
	};

	const paragraph = {
		fontFamily,
		fontSize: '16px',
		lineHeight: '26px'
	};

	const btnContainer = {
		textAlign: 'center' as const
	};

	const button = {
		fontFamily,
		backgroundColor: '#5F51E8',
		borderRadius: '3px',
		color: '#fff',
		fontSize: '16px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block'
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0'
	};

	const footer = {
		fontFamily,
		color: '#8898aa',
		fontSize: '12px'
	};
</script>

<Html lang="en">
	<Head />
	<Preview preview="Welcome to svelte-email" />
	<Section style={main}>
		<Container style={container}>
			<Img
				src="https://svelte.dev/svelte-logo-horizontal.svg"
				alt="Svelte logo"
				style={logo}
				width="200"
				height="50"
			/>
			<Text style={paragraph}>{firstName}, welcome to svelte-email</Text>
			<Text style={paragraph}>A Svelte component library for building responsive emails</Text>
			<Section style={btnContainer}>
				<Button pX={12} pY={12} style={button} href="https://github.com/carstenlebek/svelte-email">
					View on GitHub
				</Button>
			</Section>
			<Text style={paragraph}>Happy coding!</Text>
			<Hr style={hr} />
			<Text style={footer}>Carsten Lebek</Text>
		</Container>
	</Section>
</Html>
```

## Rendering email templates

### HTML

The email templates have to be rendered to HTML on the server. This can be done using the `render` function from `svelte-email`:

```js title="src/routes/send-welcome-email/+server.ts"|copy
import WelcomeEmail from '$lib/emails/welcome.svelte';
import { render } from 'svelte-email';

export async function get() {
	const html = await render({
		template: WelcomeEmail,
		props: {
			firstName: 'John'
		}
	});

	return {
		html
	};
}
```

### Plain text

To generate a plain text version of the email, you can set the `plainText` option to `true`:

```js title="src/routes/send-welcome-email/+server.ts"|copy
import WelcomeEmail from '$lib/emails/welcome.svelte';
import { render } from 'svelte-email';

export async function get() {
	const plainText = await render({
		template: WelcomeEmail,
		props: {
			firstName: 'John'
		},
		options: {
			plainText: true
		}
	});

	return {
		plainText
	};
}
```
