export default function EditJob() {
	return (
		<div className="p-4">
			<h2>Edit job</h2>

			<input placeholder="Title" />
			<input placeholder="employment type" />
			<textarea placeholder="Description" />
			<input placeholder="Salary" />
			<input placeholder="Location" />

			<div display="flex" gap="10px">
				<button type="button">save</button>
				<button type="button">cancel</button>
			</div>
		</div>
	);
}
