export const compareStrings = (options) => {
	const str1 = options.a[options.key].toUpperCase()
	const str2 = options.b[options.key].toUpperCase()

	if (str1 < str2) return -1
	if (str1 > str2) return 1

	return 0
}