import React, { useState } from "react";

const JobPostingForm = () => {
	const [formData, setFormData] = useState({
		jobTitle: "",
		employmentType: "Full-time",
		jobCategory: "",
		experienceLevel: "Entry",
		jobLocation: "",
		salaryRange: "",
		workType: "On-site",
		jobDescription: "",
		requiredSkills: "",
		coverLetterRequired: false,
		autoResponseMessage: "",
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// Add your form submission logic here
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4">
			<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">Post a Job</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Job Title */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Job Title
						</label>
						<input
							type="text"
							name="jobTitle"
							value={formData.jobTitle}
							onChange={handleChange}
							placeholder="Example: UI/UX Designer"
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>

					{/* Employment Type & Job Category */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Employment Type
							</label>
							<select
								name="employmentType"
								value={formData.employmentType}
								onChange={handleChange}
								className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="Full-time">Full-time</option>
								<option value="Part-time">Part-time</option>
								<option value="Contract">Contract</option>
								<option value="Internship">Internship</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Job Category
							</label>
							<input
								type="text"
								name="jobCategory"
								value={formData.jobCategory}
								onChange={handleChange}
								placeholder="Example: Design, Development"
								className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>
					</div>

					{/* Experience Level & Job Location */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Experience Level
							</label>
							<select
								name="experienceLevel"
								value={formData.experienceLevel}
								onChange={handleChange}
								className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="Entry">Entry Level</option>
								<option value="Intermediate">Intermediate</option>
								<option value="Senior">Senior</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Job Location
							</label>
							<input
								type="text"
								name="jobLocation"
								value={formData.jobLocation}
								onChange={handleChange}
								placeholder="City, Country"
								className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>
					</div>

					{/* Salary Range & Work Type */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Salary Range
							</label>
							<input
								type="text"
								name="salaryRange"
								value={formData.salaryRange}
								onChange={handleChange}
								placeholder="Example: $5000-$7000"
								className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Work Type
							</label>
							<select
								name="workType"
								value={formData.workType}
								onChange={handleChange}
								className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="On-site">On-site</option>
								<option value="Remote">Remote</option>
								<option value="Hybrid">Hybrid</option>
							</select>
						</div>
					</div>

					{/* Job Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Job Description
						</label>
						<textarea
							name="jobDescription"
							value={formData.jobDescription}
							onChange={handleChange}
							placeholder="Describe daily tasks, responsibilities, and required skills..."
							rows="4"
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							required
						></textarea>
					</div>

					{/* Required Skills */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Required Skills
						</label>
						<input
							type="text"
							name="requiredSkills"
							value={formData.requiredSkills}
							onChange={handleChange}
							placeholder="Example: Figma, User Research, React"
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>

					{/* Cover Letter Required */}
					<div className="flex items-center">
						<input
							type="checkbox"
							id="coverLetterRequired"
							name="coverLetterRequired"
							checked={formData.coverLetterRequired}
							onChange={handleChange}
							className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
						/>
						<label
							htmlFor="coverLetterRequired"
							className="ml-2 block text-sm text-gray-700"
						>
							Cover Letter Required
						</label>
					</div>

					{/* Auto-Response Message */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Auto-Response Message
						</label>
						<textarea
							name="autoResponseMessage"
							value={formData.autoResponseMessage}
							onChange={handleChange}
							placeholder="Thank you for applying to this position. We will review your application and get back to you soon..."
							rows="3"
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
						></textarea>
					</div>

					{/* Buttons */}
					<div className="flex justify-end space-x-4 pt-4">
						<button
							type="button"
							className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Post Job
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default JobPostingForm;
