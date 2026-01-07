export default function InfoCard({ title, text, icon }) {
	return (
		<div className="bg-white p-6 py-10 rounded-xl border border-dotted border-fuchsia-800 shadow-sm">
			<div className="flex gap-2 items-center">
				<i className={icon}></i>
				<h3 className="font-semibold mb-2">{title}</h3>
			</div>

			<p className="text-sm text-gray-600">{text}</p>
		</div>
	);
}
