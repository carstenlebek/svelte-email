# Send email using AWS SES

Learn how to send an email using Svelte Email and the AWS SES Node.js SDK.

## 1. Install dependencies

```bash title="npm"|copy
npm install svelte-email aws-sdk
```

```bash title="pnpm"|copy
pnpm add svelte-email aws-sdk
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

Next, create a server route that will convert the Svelte template to HTML and send the email using the AWS SES Node.js SDK.

```js title="src/routes/emails/hello/+server.js"
import { render } from 'svelte-email';
import Hello from '$lib/emails/Hello.svelte';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_SES_REGION });

const emailHtml = render({
	component: Hello,
	props: {
		name: 'Svelte'
	}
});

const options = {
	Source: 'you@example.com',
	Destination: {
		ToAddresses: ['user@gmail.com']
	},
	Message: {
		Body: {
			Html: {
				Charset: 'UTF-8',
				Data: emailHtml
			}
		},
		Subject: {
			Charset: 'UTF-8',
			Data: 'hello world'
		}
	}
};

const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(options).promise();
```
