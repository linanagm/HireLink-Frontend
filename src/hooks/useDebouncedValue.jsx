import { useEffect, useState } from "react";

/**
 * Debounce a value so we don't spam API / navigation on every keystroke.
 */
export function useDebouncedValue(value, delay = 400) {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const t = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(t);
	}, [value, delay]);

	return debounced;
}
