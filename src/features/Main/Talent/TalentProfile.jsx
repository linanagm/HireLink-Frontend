import { useState } from "react";
import { Link } from "react-router-dom";

// قلم SVG
const PencilIcon = ({ onClick }) => (
	<svg
		onClick={onClick}
		xmlns="http://www.w3.org/2000/svg"
		className="w-5 h-5 text-purple-600 cursor-pointer"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<title>edit</title>
		<path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.465.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.465l9.9-9.9a2 2 0 012.828 0zM15.121 4.05l.829.829-1.06 1.06-.829-.829 1.06-1.06zM5 13l6-6 1.06 1.06L6.06 14.06 5 15v-2z" />
	</svg>
);

export default function EditableProfile() {
	// State لكل Section
	const [profile, setProfile] = useState({
		name: "Lilian",
		location: "Addis Ababa",
		title: "UX/UI Designer | Fronted Developer",
		bio: "Hi there! I'm Lilian, a dedicated UX/UI designer and fronted developer with a sharp focus on creating smooth user experiences and transforming designs into reality.",
		skills: [
			"UX/UI Design",
			"HTML5, CSS3, JavaScript",
			"Responsive Web Design",
		],
		work: "No experience",
		extraSkills: ["Figma", "User Research", "Wireframing", "Prototyping"],
		certification: {
			title: "Google UX Design Specialization",
			provider: "Google",
			issued: "October 2023",
			id: "UCMNJFMB43AG",
		},
	});

	const [editMode, setEditMode] = useState({
		titleBio: false,
		skills: false,
		work: false,
		extraSkills: false,
		certification: false,
	});

	const toggleEdit = (section) => {
		setEditMode({ ...editMode, [section]: !editMode[section] });
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Main */}
			<main className="flex-grow px-6 py-6 max-w-4xl mx-auto">
				{/* Profile Card */}
				<div className="bg-white p-5 rounded-lg shadow-sm mb-6 flex justify-between items-center">
					<div className="flex items-center gap-4">
						<img
							src="/avatar.jpg"
							alt="profile"
							className="w-14 h-14 rounded-full"
						/>
						<div>
							<h2 className="font-bold text-lg">{profile.name}</h2>
							<p className="text-gray-500 text-sm">{profile.location}</p>
						</div>
					</div>
					<Link to="/profile-edit" className="text-purple-600 font-medium">
						Edit Profile
					</Link>
				</div>

				{/* Title & Bio */}
				<div className="bg-white p-5 rounded-lg shadow-sm mb-6">
					<div className="flex justify-between items-center mb-2">
						<h3 className="font-semibold text-xl">About Me</h3>
						<PencilIcon onClick={() => toggleEdit("titleBio")} />
					</div>

					{!editMode.titleBio && (
						<>
							<h3 className="font-semibold text-xl mb-2">{profile.title}</h3>
							<p className="text-gray-600 mb-3">{profile.bio}</p>
						</>
					)}

					{editMode.titleBio && (
						<div className="space-y-3">
							<input
								type="text"
								className="border rounded-lg w-full px-3 py-2"
								value={profile.title}
								onChange={(e) =>
									setProfile({ ...profile, title: e.target.value })
								}
							/>
							<textarea
								className="border rounded-lg w-full px-3 py-2"
								rows={4}
								value={profile.bio}
								onChange={(e) =>
									setProfile({ ...profile, bio: e.target.value })
								}
							/>
							<button
								type="button"
								className="bg-purple-600 text-white px-4 py-2 rounded-lg"
								onClick={() => toggleEdit("titleBio")}
							>
								Save
							</button>
						</div>
					)}
				</div>

				{/* Work Experience */}
				<div className="bg-white p-5 rounded-lg shadow-sm mb-6">
					<div className="flex justify-between items-center mb-2">
						<h3 className="font-semibold text-lg">Work Experience</h3>
						<PencilIcon onClick={() => toggleEdit("work")} />
					</div>

					{!editMode.work && <p className="text-gray-500">{profile.work}</p>}
					{editMode.work && (
						<div className="space-y-3">
							<textarea
								className="border rounded-lg w-full px-3 py-2"
								rows={3}
								value={profile.work}
								onChange={(e) =>
									setProfile({ ...profile, work: e.target.value })
								}
							/>
							<button
								type="button"
								className="bg-purple-600 text-white px-4 py-2 rounded-lg"
								onClick={() => toggleEdit("work")}
							>
								Save
							</button>
						</div>
					)}
				</div>

				{/* Skills */}
				<div className="bg-white p-5 rounded-lg shadow-sm mb-6">
					<div className="flex justify-between items-center mb-3">
						<h3 className="font-semibold text-lg">Skills</h3>
						<PencilIcon onClick={() => toggleEdit("skills")} />
					</div>

					{!editMode.skills && (
						<ul className="list-disc ml-6 text-gray-700">
							{profile.skills.map((skill, idx) => (
								<li key={idx}>{skill.name}</li>
							))}
						</ul>
					)}

					{editMode.skills && (
						<div className="space-y-3">
							{profile.skills.map((s, idx) => (
								<input
									key={idx}
									type="text"
									className="border rounded-lg w-full px-3 py-2"
									value={s}
									onChange={(e) => {
										const newSkills = [...profile.skills];
										newSkills[idx] = e.target.value;
										setProfile({ ...profile, skills: newSkills });
									}}
								/>
							))}
							<button
								type="button"
								className="bg-purple-600 text-white px-4 py-2 rounded-lg"
								onClick={() => toggleEdit("skills")}
							>
								Save
							</button>
						</div>
					)}
				</div>

				{/* Extra Skills */}
				<div className="bg-white p-5 rounded-lg shadow-sm mb-6">
					<div className="flex justify-between items-center mb-3">
						<h3 className="font-semibold text-lg">Extra Skills</h3>
						<PencilIcon onClick={() => toggleEdit("extraSkills")} />
					</div>

					{!editMode.extraSkills && (
						<div className="flex gap-2 flex-wrap">
							{profile.extraSkills.map((s, idx) => (
								<span
									key={idx}
									className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
								>
									{s}
								</span>
							))}
						</div>
					)}

					{editMode.extraSkills && (
						<div className="space-y-3">
							{profile.extraSkills.map((s, idx) => (
								<input
									key={idx}
									type="text"
									className="border rounded-lg w-full px-3 py-2"
									value={s}
									onChange={(e) => {
										const newSkills = [...profile.extraSkills];
										newSkills[idx] = e.target.value;
										setProfile({ ...profile, extraSkills: newSkills });
									}}
								/>
							))}
							<button
								type="button"
								className="bg-purple-600 text-white px-4 py-2 rounded-lg"
								onClick={() => toggleEdit("extraSkills")}
							>
								Save
							</button>
						</div>
					)}
				</div>

				{/* Certification */}
				<div className="bg-white p-5 rounded-lg shadow-sm mb-6">
					<div className="flex justify-between items-center mb-2">
						<h3 className="font-semibold text-lg">Certification</h3>
						<PencilIcon onClick={() => toggleEdit("certification")} />
					</div>

					{!editMode.certification && (
						<div>
							<p className="font-semibold">{profile.certification.title}</p>
							<p className="text-gray-600 text-sm">
								Provider: {profile.certification.provider}
							</p>
							<p className="text-gray-600 text-sm">
								Issued: {profile.certification.issued}
							</p>
							<p className="text-gray-600 text-sm">
								Certification ID: {profile.certification.id}
							</p>
						</div>
					)}

					{editMode.certification && (
						<div className="space-y-3">
							<input
								type="text"
								className="border rounded-lg w-full px-3 py-2"
								value={profile.certification.title}
								onChange={(e) =>
									setProfile({
										...profile,
										certification: {
											...profile.certification,
											title: e.target.value,
										},
									})
								}
							/>
							<input
								type="text"
								className="border rounded-lg w-full px-3 py-2"
								value={profile.certification.provider}
								onChange={(e) =>
									setProfile({
										...profile,
										certification: {
											...profile.certification,
											provider: e.target.value,
										},
									})
								}
							/>
							<input
								type="text"
								className="border rounded-lg w-full px-3 py-2"
								value={profile.certification.issued}
								onChange={(e) =>
									setProfile({
										...profile,
										certification: {
											...profile.certification,
											issued: e.target.value,
										},
									})
								}
							/>
							<input
								type="text"
								className="border rounded-lg w-full px-3 py-2"
								value={profile.certification.id}
								onChange={(e) =>
									setProfile({
										...profile,
										certification: {
											...profile.certification,
											id: e.target.value,
										},
									})
								}
							/>
							<button
								type="button"
								className="bg-purple-600 text-white px-4 py-2 rounded-lg"
								onClick={() => toggleEdit("certification")}
							>
								Save
							</button>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
