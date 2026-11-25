export function calcCodeSize(code: string): number {
	const trimmed = code
		.replace(/\s+/g, "")
		.replace(/^<\?php/, "")
		.replace(/^<\?/, "")
		.replace(/\?>$/, "");
	const utf8Encoded = new TextEncoder().encode(trimmed);
	return utf8Encoded.length;
}
