export default function Chip({ children }) {
	if (!children) return null;
	return (
		<span className="text-gray-600 text-sm bg-slate-100 px-3 py-1 rounded-full">
			{children}
		</span>
	);
}
