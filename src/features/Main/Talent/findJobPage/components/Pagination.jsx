/**
 * Pagination
 * Keeps pagination logic separate and easy to replace later with real page count.
 *
 * Note:
 * Right now it's hard-coded [1..5]. Later you should use backend pagination meta:
 * - total
 * - limit
 * - skip
 * to calculate pages.
 */
export default function Pagination({ page, onPageChange }) {
	const pages = [1, 2, 3, 4, 5];

	return (
		<div className="flex justify-center gap-3 mt-8 mb-10">
			{pages.map((num) => (
				<button
					type="button"
					key={num}
					onClick={() => onPageChange(num)}
					className={`w-8 h-8 flex items-center justify-center rounded-full ${
						num === page ? "bg-purple-600 text-white" : "bg-white border"
					}`}
				>
					{num}
				</button>
			))}
		</div>
	);
}
