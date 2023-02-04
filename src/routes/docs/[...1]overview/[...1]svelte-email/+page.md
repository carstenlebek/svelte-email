# Svelte Email

Build and send emails using Svelte and TypeScript.

### Why


> We believe that email is an extremely important medium for people to communicate. However, we need to stop developing emails like 2010, and rethink how email can be done in 2022 and beyond. Email development needs a revamp. A renovation. Modernized for the way we build web apps today.

[React Email](https://github.com/resendlabs/react-email)

### Components

This is a set of standard components to help you build amazing emails without having to deal with the mess of creating table-based layouts and maintaining archaic markup.

<script>
	// TODO: Import components from kit-docs
	import Card from "$lib/_docs/Card.svelte";
	import CardGroup from "$lib/_docs/CardGroup.svelte";
	import MouseIcon from '~icons/ri/mouse-line';
	import DashboardIcon from '~icons/ri/dashboard-line';
	import CodeIcon from '~icons/ri/code-s-slash-line';
	import TextIcon from '~icons/ri/input-method-line';
</script>

<CardGroup cols={2}>
	<Card title="HTML" description="A Svelte html component to wrap emails." href="/docs/components/HTML">
		<CodeIcon slot="icon" />
	</Card>
	<Card title="Container" description="The main wrapper that holds your content." href="/docs/components/container">
		<DashboardIcon slot="icon" />
	</Card>
	<Card title="Button" description="A Svelte button component to help build emails." href="/docs/components/button">
		<MouseIcon slot="icon" />
	</Card>
	<Card title="Text" description="A block of text seperated by blank spaces." href="/docs/components/text">
		<TextIcon slot="icon" />
	</Card>
</CardGroup>

### Integrations

In order to use Svelte Email with any email service provider, you’ll need to convert the components made with Svelte into a HTML string. This is done using the [render](/docs/utilities/render) utility.

<CardGroup cols={2}>
	<!-- <Card title="Resend" description="Send emails using Resend." href="/docs/integrations/resend" /> -->
	<Card title="Nodemailer" description="Send emails using Nodemailer." href="/docs/integrations/nodemailer" />
	<Card title="SendGrid" description="Send emails using SendGrid." href="/docs/integrations/sendgrid" />
	<Card title="Postmark" description="Send emails using Postmark." href="/docs/integrations/postmark" />
	<Card title="AWS SES" description="Send emails using AWS SES." href="/docs/integrations/aws-ses" />
</CardGroup>

### Author

- Carsten Lebek ([@carstenlebek1](https://twitter.com/carstenlebek1))

#### Based on [React Email](https://github.com/resendlabs/react-email) by

- Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita))
- Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha))
