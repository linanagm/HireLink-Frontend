/**
 * TabButton
 * Small reusable component for consistent styling and DRYness.
 */
export default function TabButton({ active, onClick, children }) {
	return (
		<button
			type="button"
			className={`pb-1 ${
				active ? "text-purple-600 border-b-2 border-purple-600" : ""
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
