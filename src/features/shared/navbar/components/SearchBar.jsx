/**
 * A search bar component that will be hidden on mobile devices.
 * It consists of a button with a magnifying glass icon and an input field.
 * The input field will have a placeholder text of "Search" and a rounded border.
 * It will also have a focus ring with a gray color.
 * The component will be rendered with the given CSS classes.
//  */
// export function SearchBar() {
// 	return (
// 		<form className="hidden md:flex w-1/2">
// 			<div className="relative w-full">
// 				<button
// 					type="button"
// 					className="absolute inset-y-0 left-0 flex items-center pl-3"
// 					aria-label="Search"
// 				>
// 					<i className="fa-solid fa-magnifying-glass text-fuchsia-800"></i>
// 				</button>
// 				<input
// 					type="search"
// 					placeholder="Search"
// 					className="w-full rounded-xl px-10 py-2.5 border border-default outline-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
// 					aria-label="Search input"
// 				/>
// 			</div>
// 		</form>
// 	);
// }

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { JOB_MODES } from "../../../../constants/jobs";
import { useAuth } from "../../../../hooks/useAuth.jsx";
import { useDebouncedValue } from "../../../../hooks/useDebouncedValue";

export function SearchBar() {
	const { currentUser, token } = useAuth();
	const role = currentUser?.role;

	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();

	// Read initial q from URL so refresh/share links keep state
	const initialQ = useMemo(() => searchParams.get("q") ?? "", [searchParams]);
	const [value, setValue] = useState(initialQ);

	// Debounced typing = real-time without server spam
	const debouncedQ = useDebouncedValue(value, 400);

	useEffect(() => {
		// If not logged in or not talent, don't do anything (for now)
		if (!token || role !== "TALENT") return;

		// Build target URL: always go to FindJob for talent searches
		const basePath = "/talent/findjob";

		const q = (debouncedQ || "").trim();

		// If empty: remove q from URL and keep user on current page (optional UX choice)
		// You said: "اختار الأفضل لليوزر" -> الأفضل: لما يفضي السيرش يرجع لليست default على findjob.
		const params = new URLSearchParams();

		// Always show search results on recent (search intent > recommendations)
		params.set("tab", JOB_MODES.RECENT);

		if (q) params.set("q", q);

		const nextUrl = `${basePath}?${params.toString()}`;

		// Avoid navigating if URL already matches (prevents loops)
		if (location.pathname + location.search === nextUrl) return;

		navigate(nextUrl, { replace: true });
	}, [debouncedQ, token, role, navigate, location.pathname, location.search]);

	return (
		<form className="hidden md:flex w-1/2" onSubmit={(e) => e.preventDefault()}>
			<div className="relative w-full">
				<button
					type="button"
					className="absolute inset-y-0 left-0 flex items-center pl-3"
					aria-label="Search"
				>
					<i className="fa-solid fa-magnifying-glass text-fuchsia-800"></i>
				</button>

				<input
					type="search"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Search jobs..."
					className="w-full rounded-xl px-10 py-2.5 border border-default outline-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
					aria-label="Search input"
				/>
			</div>
		</form>
	);
}
