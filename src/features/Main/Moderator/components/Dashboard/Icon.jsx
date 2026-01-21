import { cx } from "../../../utils/formatter.js";

export default function Icon({ name, className }) {
	const common = "w-5 h-5";
	const c = cx(common, className);

	switch (name) {
		case "dashboard":
			return (
				<svg className={c} viewBox="0 0 24 24" fill="none">
					<path
						d="M4 13h7V4H4v9Zm9 7h7V11h-7v9ZM4 20h7v-5H4v5Zm9-11h7V4h-7v5Z"
						fill="currentColor"
					/>
					<title>Dashboard Icon</title>
				</svg>
			);
		case "analytics":
			return (
				<svg
					className={c}
					viewBox="0 0 24 24"
					fill="none"
					title="Analytics Icon"
				>
					<title>Analytics Icon</title>
					<path
						d="M5 19V9m7 10V5m7 14v-7"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			);
		case "reports":
			return (
				<svg className={c} viewBox="0 0 24 24" fill="none" title="Reports Icon">
					<title>Reports Icon</title>
					<path
						d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path d="M14 3v4h4" stroke="currentColor" strokeWidth="2" />
					<path
						d="M8 12h8M8 16h8"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			);
		case "settings":
			return (
				<svg className={c} viewBox="0 0 24 24" fill="none">
					<title>Settings Icon</title>
					<path
						d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path
						d="M19.4 15a7.8 7.8 0 0 0 .1-1l2-1.2-2-3.4-2.3.6a7.6 7.6 0 0 0-1.7-1L15 6.3h-6L8.5 9a7.6 7.6 0 0 0-1.7 1l-2.3-.6-2 3.4 2 1.2a7.8 7.8 0 0 0 .1 1 7.8 7.8 0 0 0-.1 1l-2 1.2 2 3.4 2.3-.6c.5.4 1.1.7 1.7 1L9 21.7h6l.5-2.7c.6-.3 1.2-.6 1.7-1l2.3.6 2-3.4-2-1.2c.1-.3.1-.7.1-1Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "plus":
			return (
				<svg className={c} viewBox="0 0 24 24" fill="none">
					<title>Add Icon</title>
					<path
						d="M12 5v14M5 12h14"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			);
		case "trash":
			return (
				<svg className={c} viewBox="0 0 24 24" fill="none">
					<title>Trash Icon</title>
					<path
						d="M6 7h12M10 7V5h4v2m-7 0 1 14h8l1-14"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "search":
			return (
				<svg className={c} viewBox="0 0 24 24" fill="none">
					<title>Search Icon</title>
					<path
						d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path
						d="M21 21l-4.3-4.3"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			);
		default:
			return null;
	}
}
