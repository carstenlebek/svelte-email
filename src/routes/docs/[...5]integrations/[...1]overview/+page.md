# Overview

Leverage different email service providers to send emails using Svelte.

In order to use Svelte Email with any email service provider, you’ll need to convert the components made with Svelte into a HTML string. This is done using the render utility. 

<script>
	// TODO: Import components from kit-docs
	import Card from "$lib/_docs/Card.svelte";
	import CardGroup from "$lib/_docs/CardGroup.svelte";
</script>

<CardGroup cols={2}>
	<!-- <Card title="Resend" description="Send emails using Resend." href="/docs/integrations/resend" /> -->
	<Card title="Nodemailer" description="Send emails using Nodemailer." href="/docs/integrations/nodemailer" />
	<Card title="SendGrid" description="Send emails using SendGrid." href="/docs/integrations/sendgrid" />
	<Card title="Postmark" description="Send emails using Postmark." href="/docs/integrations/postmark" />
	<Card title="AWS SES" description="Send emails using AWS SES." href="/docs/integrations/aws-ses" />
</CardGroup>