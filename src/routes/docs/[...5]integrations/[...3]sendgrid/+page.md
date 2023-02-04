# Send email using SendGrid

Learn how to send an email using Svelte Email and the SendGrid Node.js SDK.

## 1. Install dependencies

```bash title="npm"|copy
npm install svelte-email @sendgrid/mail
```

```bash title="pnpm"|copy
pnpm add svelte-email @sendgrid/mail
```

## 2. Create an email using Svelte

Start by building your email template in a `.svelte` file. For example, let's create a simple email template called `Hello.svelte`:

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

## 3. Convert to HTML and send email

Next, create a server route that will convert the Svelte template to HTML and send the email using the SendGrid Node.js SDK.

```js title="src/routes/emails/hello/+server.js"
import { render } from 'svelte-email';
import Hello from '$lib/emails/Hello.svelte';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const emailHtml = render({
	component: Hello,
	props: {
		name: 'Svelte'
	}
});

const options = {
  from: 'you@example.com',
  to: 'user@gmail.com',
  subject: 'hello world',
  html: emailHtml,
};

sendgrid.send(options);
```
