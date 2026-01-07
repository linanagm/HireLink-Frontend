import { useEffect, useMemo, useState } from "react";

export default function AchievementCarousel({ items = [] }) {
	const [active, setActive] = useState(0);
	const total = items.length;

	const norm = (i) => ((i % total) + total) % total;
	const go = (dir) => setActive((prev) => norm(prev + dir));

	// اختياري: تحريك بالكيبورد
	useEffect(() => {
		const onKeyDown = (e) => {
			if (e.key === "ArrowLeft") go(-1);
			if (e.key === "ArrowRight") go(1);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [total]);

	const visible = useMemo(() => {
		if (!total) return [];
		return [-2, -1, 0, 1, 2].map((offset) => {
			const idx = norm(active + offset);
			return { offset, item: items[idx], idx };
		});
	}, [active, items, total]);

	if (!items || total === 0) return null;

	const posClass = (offset) => {
		switch (offset) {
			case 0:
				return "z-30 w-[340px] sm:w-[460px] h-[220px] sm:h-[260px] opacity-100";
			case 1:
				return "z-20 w-[300px] sm:w-[420px] h-[200px] sm:h-[240px] opacity-50 translate-x-[170px] sm:translate-x-[240px]";
			case -1:
				return "z-20 w-[300px] sm:w-[420px] h-[200px] sm:h-[240px] opacity-50 -translate-x-[170px] sm:-translate-x-[240px]";
			case 2:
				return "z-10 w-[260px] sm:w-[380px] h-[180px] sm:h-[220px] opacity-25 translate-x-[280px] sm:translate-x-[400px]";
			case -2:
				return "z-10 w-[260px] sm:w-[380px] h-[180px] sm:h-[220px] opacity-25 -translate-x-[280px] sm:-translate-x-[400px]";
			default:
				return "hidden";
		}
	};

	return (
		<section className="py-14">
			<div className="max-w-6xl mx-auto px-6">
				{/* Stage */}
				<div className="relative h-[260px] sm:h-[300px] flex items-center justify-center">
					{/* Cards */}
					<div className="relative w-full h-full flex items-center justify-center overflow-visible">
						{visible.map(({ offset, item, idx }) => (
							<div
								key={`${idx}-${offset}`}
								className={`absolute rounded-2xl overflow-hidden transition-all duration-500 ease-out ${posClass(
									offset,
								)}`}
							>
								<img
									src={item.image}
									alt={item.label}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-black/45" />
								<div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
									<p className="text-4xl sm:text-5xl font-extrabold">
										{item.value}
									</p>
									<p className="mt-2 text-sm sm:text-base font-medium opacity-90">
										{item.label}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* cotrolors */}
				<div className="flex items-center justify-center align-middle gap-2 ">
					{/* Left Arrow */}
					<button
						type="button"
						onClick={() => go(-1)}
						className=" hover:bg-white  transition"
						aria-label="Previous"
					>
						<span className="">
							<i className="fa-solid fa-arrow-left text-slate-600"></i>
						</span>
					</button>

					{/* Dots */}
					<div className=" flex items-center justify-center gap-2">
						{items.map((_, i) => (
							<button
								type="button"
								key={i}
								onClick={() => setActive(i)}
								className={` h-2 rounded-full transition-all duration-300 ${
									i === active
										? "w-6 bg-fuchsia-700"
										: "w-2 bg-gray-300 hover:bg-gray-400"
								}`}
								aria-label={`Go to slide ${i + 1}`}
							/>
						))}
					</div>

					{/* Right Arrow */}
					<button
						type="button"
						onClick={() => go(1)}
						className="  hover:bg-white  transition"
						aria-label="Next"
					>
						<span className="">
							<i className="fa-solid fa-arrow-right text-slate-600"></i>
						</span>
					</button>
				</div>
			</div>
		</section>
	);
}
