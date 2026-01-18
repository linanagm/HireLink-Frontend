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
