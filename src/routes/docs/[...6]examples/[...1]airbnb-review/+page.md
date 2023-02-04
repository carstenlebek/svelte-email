# Airbnb Review Notification

## Template

```svelte title="Template"|copy
<script lang="ts">
	import {
		Button,
		Container,
		Head,
		Heading,
		Hr,
		Html,
		Img,
		Link,
		Preview,
		Section,
		Text
	} from '$lib';

	const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

	export let authorName = 'Alex';
	export let authorImage = `${baseUrl}/static/airbnb-review-user.jpg`;
	export let reviewText = `“Zeno was a great guest! Easy communication, the apartment was left
  in great condition, very polite, and respectful of all house rules.
  He’s welcome back anytime and would easily recommend him to any
  host!”`;

	const previewText = `Read ${authorName}'s review`;

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const main = {
		backgroundColor: '#ffffff'
	};

	const container = {
		margin: '0 auto',
		padding: '20px 0 48px',
		width: '580px'
	};

	const userImage = {
		margin: '0 auto',
		marginBottom: '16px',
		borderRadius: '50%'
	};

	const heading = {
		fontFamily,
		fontSize: '32px',
		lineHeight: '1.3',
		fontWeight: '700',
		color: '#484848'
	};

	const paragraph = {
		fontFamily,
		fontSize: '18px',
		lineHeight: '1.4',
		color: '#484848'
	};

	const review = {
		...paragraph,
		padding: '24px',
		backgroundColor: '#f2f3f3',
		borderRadius: '4px'
	};

	const button = {
		fontFamily,
		backgroundColor: '#ff5a5f',
		borderRadius: '3px',
		color: '#fff',
		fontSize: '18px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block',
		width: '100%'
	};

	const link = {
		...paragraph,
		color: '#ff5a5f',
		display: 'block'
	};

	const reportLink = {
		fontFamily,
		fontSize: '14px',
		color: '#9ca299',
		textDecoration: 'underline'
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0'
	};

	const footer = {
		fontFamily,
		color: '#9ca299',
		fontSize: '14px',
		marginBottom: '10px'
	};
</script>

<Html>
	<Head />
	<Preview preview={previewText} />
	<Section style={main}>
		<Container style={container}>
			<Img src={`${baseUrl}/airbnb-logo.png`} width="96" height="30" alt="Airbnb" />
			<Section>
				<Img src={authorImage} width="96" height="96" alt={authorName} style={userImage} />
			</Section>
			<Heading style={heading}>Here's what {authorName} wrote</Heading>
			<Text style={review}>{reviewText}</Text>
			<Text style={paragraph}>
				Now that the review period is over, we’ve posted {authorName}’s review to your Airbnb
				profile.
			</Text>
			<Text style={paragraph}>
				While it’s too late to write a review of your own, you can send your feedback to {authorName}
				using your Airbnb message thread.
			</Text>
			<Section style={{ padding: '16px 0 20px' }}>
				<Button pY={19} style={button} href="https://airbnb.com/">Send My Feedback</Button>
			</Section>
			<Hr style={hr} />
			<Text style={{ ...paragraph, fontWeight: '700' }}>Common questions</Text>
			<Text>
				<Link href="https://airbnb.com/help/article/13" style={link}>How do reviews work?</Link>
			</Text>
			<Text>
				<Link href="https://airbnb.com/help/article/1257" style={link}>
					How do star ratings work?
				</Link>
			</Text>
			<Text>
				<Link href="https://airbnb.com/help/article/995" style={link}>
					Can I leave a review after 14 days?
				</Link>
			</Text>
			<Hr style={hr} />
			<Text style={footer}>Airbnb, Inc., 888 Brannan St, San Francisco, CA 94103</Text>
			<Link href="https://airbnb.com" style={reportLink}>Report unsafe behavior</Link>
		</Container>
	</Section>
</Html>
```

## Result

### HTML

<script lang="ts">
	export let data
</script>

<iframe srcdoc={data.html} style="width: 100%; height: 800px; border: 0;"></iframe>

### Plain Text

<div style="whitespace: pre-line; font-family: monospace; font-size: 14px; line-height: 1.4; background-color: #f2f3f3; padding: 16px; border-radius: 4px; margin-bottom: 16px;">
	{@html data.plainText.replace(/\n/g, "<br />")}
</div>
