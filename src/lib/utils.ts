export const copyTextToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		throw new Error('Not able to copy');
	}
};

export const pxToPt = (px: string): number | null =>
	isNaN(Number(px)) ? null : (parseInt(px, 10) * 3) / 4;

export interface Margin {
	m?: string;
	mx?: string;
	my?: string;
	mt?: string;
	mr?: string;
	mb?: string;
	ml?: string;
}

export const withMargin = (props: Margin) =>
	[
		withSpace(props.m, ['margin']),
		withSpace(props.mx, ['marginLeft', 'marginRight']),
		withSpace(props.my, ['marginTop', 'marginBottom']),
		withSpace(props.mt, ['marginTop']),
		withSpace(props.mr, ['marginRight']),
		withSpace(props.mb, ['marginBottom']),
		withSpace(props.ml, ['marginLeft'])
	].filter((s) => Object.keys(s).length)[0];

const withSpace = (value: string | undefined, properties: string[]) => {
	return properties.reduce((styles, property) => {
		if (value) {
			return { ...styles, [property]: `${value}px` };
		}
		return styles;
	}, {});
};

// https://stackoverflow.com/a/61410824

export const styleToString = (style: Record<string, string | number | null>) => {
	return Object.keys(style).reduce(
		(acc, key) =>
			acc +
			key
				.split(/(?=[A-Z])/)
				.join('-')
				.toLowerCase() +
			':' +
			style[key] +
			';',
		''
	);
};

export const unreachable = (
	condition: never,
	message = `Entered unreachable code. Received '${condition}'.`
): never => {
	throw new TypeError(message);
};
