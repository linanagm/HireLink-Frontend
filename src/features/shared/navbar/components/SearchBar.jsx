import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { JOB_MODES } from "../../../../constants/jobs";
import { useAuth } from "../../../../hooks/useAuth.jsx";
import { useDebouncedValue } from "../../../../hooks/useDebouncedValue";

/**
 * SearchBar
 *
 * A debounced search bar that navigates to the find job page on submit.
 * The search bar is hidden on mobile devices and only visible on tablets and above.
 * The search bar is also only visible when the user is logged in and has the "TALENT" role.
 * The search bar is pre-filled with the current search query from the URL.
 * The search bar uses the `useDebouncedValue` hook to debounce the search input,
 * so that the search query is only updated every 400ms.
 * The search bar also uses the `useEffect` hook to navigate to the find job page
 * when the search query is updated or when the form is submitted.
 * The search bar also uses the `useEffect` hook to update the search query in the URL
 * when the form is submitted.
 * The search bar does not depend on location changes, so it will not re-render
 * when the location changes.
 * The search bar also uses the `useEffect` hook to set the value of the search
 * input to the current search query from the URL when the component mounts.
 */
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
  if (!token || role !== "TALENT") return;

  const q = (debouncedQ || "").trim();
  const basePath = "/talent/findjob";

  // لو فاضي: ما تخطفيش اليوزر من أي صفحة
  // لكن لو هو واقف في findjob، رجّعيه لليست default
  if (!q) {
    if (location.pathname === basePath) {
      navigate(`${basePath}?tab=${JOB_MODES.RECENT}`, { replace: true });
    }
    return;
  }

  // لو فيه q: روّحيه لصفحة البحث (FindJob) على recent
  navigate(
    `${basePath}?tab=${JOB_MODES.RECENT}&q=${encodeURIComponent(q)}`,
    { replace: true }
  );

  // intentionally NOT depending on location changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [debouncedQ, token, role, navigate]);

	useEffect(() => {
	setValue(searchParams.get("q") ?? "");
		}, [searchParams]);

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
