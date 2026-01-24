export default function PencilButton({
	onClick,
	ariaLabel = "Edit",
	className = "",
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={ariaLabel}
			className={
				"w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-sm hover:bg-purple-700 transition " +
				className
			}
		>
			<i className="fa-solid fa-pen text-sm" />
		</button>
	);
}
