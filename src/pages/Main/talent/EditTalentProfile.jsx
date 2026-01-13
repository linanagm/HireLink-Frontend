import { useState } from "react";

export default function OnboardingProfileSetup() {
	const [socialLinks, setSocialLinks] = useState([""]);
	const [skills, setSkills] = useState([""]);
	const [profileImage, setProfileImage] = useState(null);
	const [resumeFile, setResumeFile] = useState("");

	const handleLinkChange = (index, value) => {
		const newLinks = [...socialLinks];
		newLinks[index] = value;
		setSocialLinks(newLinks);
	};

	const addSocialLink = () => {
		setSocialLinks([...socialLinks, ""]);
	};

	const removeSocialLink = (index) => {
		setSocialLinks(socialLinks.filter((_, i) => i !== index));
	};

	const handleSkillChange = (index, value) => {
		const newSkills = [...skills];
		newSkills[index] = value;
		setSkills(newSkills);
	};

	const addSkill = () => {
		setSkills([...skills, ""]);
	};

	const removeSkill = (index) => {
		setSkills(skills.filter((_, i) => i !== index));
	};

	const handleProfileImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setProfileImage(URL.createObjectURL(file));
		}
	};

	const handleResumeChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setResumeFile(file.name);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
			<div className="bg-white w-full max-w-4xl rounded-2xl shadow p-10">
				<h1 className="text-2xl font-bold text-center mb-10">
					Onboarding Profile Setup
				</h1>

				<form className="space-y-6">
					{/* Profile Picture Upload */}
					<div>
						<label
							htmlFor="profileImageUpload"
							className="block text-sm font-medium mb-2"
						>
							Profile Picture Upload
						</label>

						<label
							htmlFor="profileImage"
							className="flex items-center justify-center w-32 h-32 border rounded-full cursor-pointer overflow-hidden bg-gray-100 hover:bg-gray-200"
						>
							{profileImage ? (
								<img
									src={profileImage}
									alt="Profile Preview"
									className="w-full h-full object-cover"
								/>
							) : (
								<span className="text-3xl text-purple-600">＋</span>
							)}
							<input
								id="profileImage"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleProfileImageChange}
							/>
						</label>
					</div>

					{/* Headline */}
					<div>
						<label
							htmlFor="job-title"
							className="block text-sm font-medium mb-1"
						>
							Headline / Job Title
						</label>
						<input
							id="job-title"
							type="text"
							placeholder="e.g., UI/UX Designer"
							className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
						/>
					</div>

					{/* Location */}
					<div>
						<label
							htmlFor="location"
							className="block text-sm font-medium mb-1"
						>
							Location
						</label>
						<input
							id="location"
							type="text"
							placeholder="Current Location"
							className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
						/>
					</div>

					{/* Upload Resume */}
					<div>
						<label
							htmlFor="resume-upload"
							className="block text-sm font-medium mb-1"
						>
							Upload Resume
						</label>
						<div className="flex items-center border rounded-lg p-3">
							<input
								id="resume-upload"
								type="text"
								placeholder="Upload Resume"
								className="w-full focus:outline-none"
								value={resumeFile}
								readOnly
							/>
							<label
								htmlFor=""
								className="ml-2 text-purple-600 text-lg cursor-pointer"
							>
								📁
								<input
									type="file"
									accept=".pdf,.doc,.docx"
									className="hidden"
									onChange={handleResumeChange}
								/>
							</label>
						</div>
					</div>

					{/* Skills Tags */}
					<div>
						<label htmlFor="skills" className="block text-sm font-medium mb-1">
							Skills Tags
						</label>
						{skills.map((skill, index) => (
							<div
								key={link.id}
								className="flex items-center border rounded-lg p-3 mb-2"
							>
								<input
									type="text"
									placeholder="Skills Tag"
									className="w-full focus:outline-none"
									value={skill}
									onChange={(e) => handleSkillChange(index, e.target.value)}
								/>
								<button
									type="button"
									className="text-purple-600 text-xl cursor-pointer ml-2"
									onClick={addSkill}
								>
									＋
								</button>
								{skills.length > 1 && (
									<button
										type="button"
										className="text-red-600 text-xl cursor-pointer ml-2"
										onClick={() => removeSkill(index)}
									>
										✕
									</button>
								)}
							</div>
						))}
					</div>

					{/* Job Preferences */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="job-type"
								className="block text-sm font-medium mb-1"
							>
								Job Type
							</label>
							<select
								id="job-type"
								className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
								defaultValue=""
							>
								<option value="" disabled>
									Type (Full-time, Part-time, Freelance)
								</option>
								<option value="Full-time">Full-time</option>
								<option value="Part-time">Part-time</option>
								<option value="Freelance">Freelance</option>
							</select>
						</div>

						<div>
							<label
								htmlFor="enviroment"
								className="block text-sm font-medium mb-1"
							>
								Environment
							</label>
							<select
								id="enviroment"
								className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
								defaultValue=""
							>
								<option value="" disabled>
									Environment (Remote, Hybrid, On-site)
								</option>
								<option value="Remote">Remote</option>
								<option value="Hybrid">Hybrid</option>
								<option value="On-site">On-site</option>
							</select>
						</div>
					</div>

					{/* Social Links */}
					<div>
						<label htmlFor="" className="block text-sm font-medium mb-1">
							Social Links
						</label>
						{socialLinks.map((link, index) => (
							<div
								key={link.id}
								className="flex items-center border rounded-lg p-3 mb-2"
							>
								<input
									id={`social-link-${index}`}
									type="text"
									placeholder="Social Link"
									className="w-full focus:outline-none"
									value={link}
									onChange={(e) => handleLinkChange(index, e.target.value)}
								/>
								<button
									type="button"
									className="text-purple-600 text-xl cursor-pointer ml-2"
									onClick={addSocialLink}
								>
									＋
								</button>
								{socialLinks.length > 1 && (
									<button
										type="button"
										className="text-red-600 text-xl cursor-pointer ml-2"
										onClick={() => removeSocialLink(index)}
									>
										✕
									</button>
								)}
							</div>
						))}
					</div>

					{/* Summary */}
					<div>
						<label htmlFor="bio" className="block text-sm font-medium mb-1">
							Short Bio / Summary
						</label>
						<textarea
							id="bio"
							name="bio"
							placeholder="Summary"
							className="w-full border rounded-lg p-3 h-24 focus:ring-2 focus:ring-purple-500"
						></textarea>
					</div>

					{/* Buttons */}
					<div className="flex justify-center gap-4 mt-6">
						<button
							type="button"
							className="bg-purple-600 text-white px-6 py-2 rounded-lg"
						>
							Signup
						</button>
						<button
							type="button"
							className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg"
						>
							Skip
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
