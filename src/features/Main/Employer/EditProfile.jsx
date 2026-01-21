// // اتحذفت onboarding profile
// import { useState } from "react";

// function App() {
// 	const [form, setForm] = useState({
// 		industry: "",
// 		website: "",
// 		about: "",
// 		companySize: "",
// 		address: "",
// 		linkedin: "",
// 		recruiterProfile: "",
// 	});

// 	const handleChange = (e) => {
// 		setForm({
// 			...form,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		console.log("Form data:", form);
// 		alert("تم حفظ البيانات بنجاح!");
// 	};

// 	const handleSkip = () => {
// 		if (window.confirm("هل تريد تخطي إعداد الملف الشخصي؟")) {
// 			alert("تم التخطي");
// 		}
// 	};

// 	return (
// 		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
// 			<h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
// 				Onboarding Profile Setup
// 			</h1>

// 			{/* Profile Picture Upload */}
// 			<div className="text-center mb-6">
// 				<h3 className="font-semibold text-gray-700 mb-2">
// 					Profile Picture Upload
// 				</h3>
// 				<input
// 					type="file"
// 					className="block mx-auto text-sm text-gray-500
//                       file:mr-4 file:py-2 file:px-4
//                       file:rounded-full file:border-0
//                       file:text-sm file:font-semibold
//                       file:bg-blue-50 file:text-blue-700
//                       hover:file:bg-blue-100"
// 				/>
// 			</div>
// 			<form onSubmit={handleSubmit} className="space-y-4">
// 				{/* Industry Selection */}
// 				<div>
// 					<label className="block text-gray-700 mb-1">
// 						<strong> Industry Selection </strong>
// 					</label>
// 					<select
// 						name="industry"
// 						value={form.industry}
// 						onChange={handleChange}
// 						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// 					>
// 						<option value="">Select Industry</option>
// 						<option value="technology">Technology</option>
// 						<option value="healthcare">Healthcare</option>
// 						<option value="finance">Finance</option>
// 						<option value="education">Education</option>
// 						<option value="manufacturing">Manufacturing</option>
// 					</select>
// 				</div>

// 				{/* Company Website */}
// 				<div>
// 					<label className="block text-gray-700 mb-1">
// 						<strong> Company Website </strong>
// 					</label>
// 					<input
// 						type="url"
// 						name="website"
// 						value={form.website}
// 						onChange={handleChange}
// 						placeholder="https://company.com"
// 						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// 					/>
// 				</div>

// 				{/* About the Company */}
// 				<div>
// 					<label className="block text-gray-700 mb-1">
// 						<strong> About the Company </strong>
// 					</label>
// 					<textarea
// 						name="about"
// 						value={form.about}
// 						onChange={handleChange}
// 						placeholder="Tell us about your company..."
// 						rows="3"
// 						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// 					/>
// 				</div>

// 				{/* Company Size */}
// 				<div>
// 					<label className="block text-gray-700 mb-1">
// 						<strong> Company Size </strong>
// 					</label>
// 					<select
// 						name="companySize"
// 						value={form.companySize}
// 						onChange={handleChange}
// 						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// 					>
// 						<option value="">Select Company Size</option>
// 						<option value="51-200">51-200 employees</option>
// 						<option value="201-500">201-500 employees</option>
// 						<option value="500+">500+ employees</option>
// 					</select>
// 				</div>

// 				{/* Company Address */}
// 				<div>
// 					<label className="block text-gray-700 mb-1">
// 						<strong> Company Address </strong>
// 					</label>
// 					<input
// 						type="text"
// 						name="address"
// 						value={form.address}
// 						onChange={handleChange}
// 						placeholder="Enter company address"
// 						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// 					/>
// 				</div>

// 				{/* Social Links */}
// 				<div>
// 					<label className="block text-gray-700 mb-1">
// 						<strong> LinkedIn / Social Profiles </strong>
// 					</label>
// 					<input
// 						type="url"
// 						name="linkedin"
// 						value={form.linkedin}
// 						onChange={handleChange}
// 						placeholder="https://linkedin.com/company/..."
// 						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// 					/>
// 				</div>

// 				{/* Recruiter Profile */}
// 				<div>
// 					<label className="block text-gray-700 mb-1">
// 						<strong> Recruiter Profile </strong>
// 					</label>
// 					<input
// 						type="text"
// 						name="recruiterProfile"
// 						value={form.recruiterProfile}
// 						onChange={handleChange}
// 						placeholder="Recruiter profile information..."
// 						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// 					/>
// 				</div>

// 				{/* buttons */}
// 				<div className="flex justify-between pt-6 border-t border-gray-200">
// 					<button
// 						type="button"
// 						onClick={handleSkip}
// 						className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// 					>
// 						Skip
// 					</button>
// 					<button
// 						type="submit"
// 						className="px-6 py-2 bg-purple-600  text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
// 					>
// 						Signup
// 					</button>
// 				</div>
// 			</form>
// 		</div>
// 	);
// }

// export default App;
