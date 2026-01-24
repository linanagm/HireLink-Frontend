/**
 * Splits a full name into its first and last name components.
 * If the full name is empty or not a string, returns an object with empty first and last names.
 * If the full name only contains one part (i.e. no spaces), returns an object with the first name set to that part and the last name set to an empty string.
 * Otherwise, returns an object with the first name set to the first part of the full name and the last name set to the remaining parts joined by spaces.
 * @param {string} fullName - The full name to split.
 * @returns {object} - An object containing the first and last name components.
 * @example
 * const fullName = "John Doe";
 * const { firstName, lastName } = splitName(fullName);
 * console.log(firstName); // John
 * console.log(lastName); // Doe
 */
export function splitName(fullName) {
	if (!fullName || typeof fullName !== "string") {
		return { firstName: "", lastName: "" };
	}

	const parts = fullName.trim().split(/\s+/);
	if (parts.length === 1) {
		return {
			firstName: parts[0],
			lastName: "",
		};
	}
	console.log(
		"first name -> ",
		parts[0],
		"\n",
		"Last name -> ",
		parts.slice(1).join(" "),
	);

	return {
		firstName: parts[0],
		lastName: parts.slice(1).join(" "),
	};
}
