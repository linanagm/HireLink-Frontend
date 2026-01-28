export default function Chip({ children }) {
	if (!children) return null;
	return (
		<span className="text-gray-600 text-sm bg-gray-100 px-3 py-2 rounded-full">
			{children}
		</span>
	);
}
