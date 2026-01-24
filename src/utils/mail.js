/**
 * Given an email address, returns the URL of the corresponding mail provider
 * @param {string} email - The email address to get the mail provider URL for
 * @returns {string|null} - The URL of the mail provider, or null if the domain is not recognized
 */
export function getMailProviderUrl(email) {
	console.log("getMailProvrider: email -> ", email);

	const domain = email.split("@")[1];

	if (!domain) return null;

	if (domain.includes("gmail")) return "https://mail.google.com";
	if (
		domain.includes("outlook") ||
		domain.includes("hotmail") ||
		domain.includes("live")
	)
		return "https://outlook.live.com";
	if (domain.includes("yahoo")) return "https://mail.yahoo.com";

	return null;
}
