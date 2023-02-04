# Send email using Nodemailer

Learn how to send an email using Svelte Email and Nodemailer.

## 1. Install dependencies

```bash title="npm"|copy
npm install svelte-email nodemailer
```

```bash title="pnpm"|copy
pnpm add svelte-email nodemailer
```

## 2. Create an email using Svelte

<script>
	import { Chip } from '@svelteness/kit-docs';
</script>

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

Next, create a server route that will convert the Svelte template to HTML and send the email using Nodemailer.

```js title="src/routes/emails/hello/+server.js"
import { json } from '@sveltejs/kit';
import { render } from 'svelte-email';
import Hello from '$lib/emails/Hello.svelte';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	secure: false,
	auth: {
		user: 'my_user',
		pass: 'my_password'
	}
});

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
	html: emailHtml
};

transporter.sendMail(options);
```
