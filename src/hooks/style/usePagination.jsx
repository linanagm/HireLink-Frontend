// export function useClientPagination(items, pageSize = 8) {
// 	const [page, setPage] = React.useState(1);
// 	const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
// 	const safePage = Math.min(page, totalPages);

// 	const pageItems = React.useMemo(() => {
// 		const start = (safePage - 1) * pageSize;
// 		return items.slice(start, start + pageSize);
// 	}, [items, safePage, pageSize]);

// 	React.useEffect(() => {
// 		setPage(1);
// 	}, [pageSize, items.length]);

// 	return { page: safePage, totalPages, setPage, pageItems };
// }

// export function Pager({ page, totalPages, setPage }) {
// 	return (
// 		<div className="mt-4 flex items-center justify-between text-sm">
// 			<button
// 				type="button"
// 				className="px-3 py-2 rounded-lg border disabled:opacity-50"
// 				onClick={() => setPage(page - 1)}
// 				disabled={page <= 1}
// 			>
// 				Prev
// 			</button>
// 			<div className="text-gray-600">
// 				Page <span className="font-semibold">{page}</span> of{" "}
// 				<span className="font-semibold">{totalPages}</span>
// 			</div>
// 			<button
// 				type="button"
// 				className="px-3 py-2 rounded-lg border disabled:opacity-50"
// 				onClick={() => setPage(page + 1)}
// 				disabled={page >= totalPages}
// 			>
// 				Next
// 			</button>
// 		</div>
// 	);
// }
