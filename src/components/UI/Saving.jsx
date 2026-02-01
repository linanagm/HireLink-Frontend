export default function Saving() {
	return (
		<div className="mt-3 flex items-center gap-2 text-xl text-green-700 mb-2">
			<span className="animate-pulse">
				<i class="fa-regular fa-circle-dot"></i> Saving
			</span>
			<span className="animate-pulse delay-150">.</span>
			<span className="animate-pulse delay-300">.</span>
			<span className="animate-pulse delay-500">.</span>
		</div>
	);
}
