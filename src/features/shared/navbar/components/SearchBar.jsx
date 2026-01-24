/**
 * A search bar component that will be hidden on mobile devices.
 * It consists of a button with a magnifying glass icon and an input field.
 * The input field will have a placeholder text of "Search" and a rounded border.
 * It will also have a focus ring with a gray color.
 * The component will be rendered with the given CSS classes.
 */
export function SearchBar() {
	return (
		<form className="hidden md:flex w-1/2">
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
					placeholder="Search"
					className="w-full rounded-xl px-10 py-2.5 border border-default outline-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
					aria-label="Search input"
				/>
			</div>
		</form>
	);
}
