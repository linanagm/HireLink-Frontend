export default function TestimonialCard({ name, role, text }) {
	return (
		<div
			className="
        bg-zinc-300
        p-6
        rounded-2xl
        transition
        duration-300
        ease-out
        hover:scale-105
        hover:shadow-xl
        cursor-pointer
      "
		>
			{/* Header */}
			<div className="flex items-center gap-3 mb-4 p-2">
				{/* Avatar */}
				<div className="w-10 h-10 rounded-full bg-white"></div>

				<div>
					<p className="font-semibold text-sm">{name}</p>
					<p className="text-xs text-gray-500">{role}</p>
				</div>
			</div>

			{/* Content */}
			<div className="flex gap-3">
				{/* Vertical line */}
				<span className="w-0.5 bg-black rounded-full"></span>

				<p className="text-sm text-gray-700 leading-relaxed">{text}</p>
			</div>
		</div>
	);
}
