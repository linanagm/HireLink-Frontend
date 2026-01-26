// import { FiSearch } from "react-icons/fi";
// import { IoSettingsOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";

// const talents = [
// 	{
// 		name: "Samantha K. Brown",
// 		role: "UX/UI Designer",
// 		rate: "$45/hr",
// 		desc: "Senior Software Engineer with 10 years experience in AI and Machine Learning",
// 		skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
// 		img: "https://i.pravatar.cc/100?img=12",
// 	},
// 	{
// 		name: "James T. Lee",
// 		role: "Product Designer | Onsite | $50/hr",
// 		desc: "Creative Product Designer with a focus on mobile applications...",
// 		skills: ["Sketch", "Interaction Design", "Visual Design"],
// 		img: "https://i.pravatar.cc/100?img=21",
// 	},
// 	{
// 		name: "Olivia H. Carter",
// 		role: "Web Developer | Remote | $55/hr",
// 		desc: "Front-end developer with expertise in React and responsive design",
// 		skills: ["HTML/CSS", "JavaScript", "UI", "Frameworks"],
// 		img: "https://i.pravatar.cc/100?img=32",
// 	},
// 	{
// 		name: "David R. Johnson",
// 		role: "Product Designer | Remote | $48/hr",
// 		desc: "Versatile designer skilled in UX and interaction design",
// 		skills: ["Figma", "Wireframing", "User Testing"],
// 		img: "https://i.pravatar.cc/100?img=44",
// 	},
// 	{
// 		name: "Sophia L. Zhang",
// 		role: "Content Strategist | Freelance | $42/hr",
// 		desc: "Creative content strategist focusing on SEO and engagement",
// 		skills: ["Content", "SEO", "Copywriting"],
// 		img: "https://i.pravatar.cc/100?img=53",
// 	},
// 	{
// 		name: "Liam A. Wilson",
// 		role: "UX Researcher | Remote | $50/hr",
// 		desc: "UX researcher with strong background in usability testing",
// 		skills: ["User Testing", "Analytics", "Persona Development"],
// 		img: "https://i.pravatar.cc/100?img=64",
// 	},
// 	{
// 		name: "Ava M. Johnson",
// 		role: "Visual Designer | Onsite | $52/hr",
// 		desc: "Visual designer specializing in branding and interactions",
// 		skills: ["Adobe XD", "UI Design", "Animation"],
// 		img: "https://i.pravatar.cc/100?img=70",
// 	},
// 	{
// 		name: "Ethan C. Moore",
// 		role: "Service Designer | Remote | $57/hr",
// 		desc: "Service designer focused on improving customer journey",
// 		skills: ["Miro", "Prototyping", "Journey Mapping"],
// 		img: "https://i.pravatar.cc/100?img=80",
// 	},
// 	{
// 		name: "Mia J. Taylor",
// 		role: "Interaction Designer | Remote | $54/hr",
// 		desc: "Specialist in user flow optimization and accessibility",
// 		skills: ["InVision", "User Flow", "Accessibility"],
// 		img: "https://i.pravatar.cc/100?img=90",
// 	},
// 	{
// 		name: "Noah V. Smith",
// 		role: "Graphic Designer | Freelance | $46/hr",
// 		desc: "Graphic designer known for brand identities",
// 		skills: ["Canva", "Branding", "Illustration"],
// 		img: "https://i.pravatar.cc/100?img=10",
// 	},
// ];

export default function SearchTalent() {
	return (
		// <div className="w-full bg-gray-50 min-h-screen">
		// 	<div className="w-full bg-white shadow-sm px-10 py-5 flex justify-between items-center">
		// 		<div className="flex items-center gap-12">
		// 			<h1 className="text-3xl font-bold text-purple-600">H</h1>

		// 			<nav className="flex gap-8 text-gray-700 font-medium">
		// 				<Link to="/dashboard">Dashboard</Link>
		// 				<a href="#postjob">Post a Job</a>
		// 				<a className="text-purple-600 font-semibold" href="#search">
		// 					Search Talent
		// 				</a>
		// 			</nav>
		// 		</div>

		// 		<div className="flex items-center gap-5">
		// 			<div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-72">
		// 				<FiSearch className="text-gray-500 mr-2" />
		// 				<input
		// 					placeholder="Search Talent"
		// 					className="bg-transparent outline-none w-full"
		// 				/>
		// 			</div>

		// 			<IoSettingsOutline className="text-gray-600 text-2xl cursor-pointer" />

		// 			<img
		// 				src="https://i.pravatar.cc/100?img=5"
		// 				className="w-10 h-10 rounded-full"
		// 				alt=""
		// 			/>
		// 		</div>
		// 	</div>

		// 	<div className="px-10 py-6 flex gap-4">
		// 		<select className="px-4 py-2 bg-white border rounded-lg">
		// 			<option>Industry</option>
		// 		</select>

		// 		<select className="px-4 py-2 bg-white border rounded-lg">
		// 			<option>Experience</option>
		// 		</select>

		// 		<select className="px-4 py-2 bg-white border rounded-lg">
		// 			<option>Skills</option>
		// 		</select>
		// 	</div>

		// 	<div className="px-10 grid grid-cols-2 gap-6">
		// 		{talents.map((t, i) => (
		// 			<div key={i.id} className="bg-purple-100 rounded-xl p-6 shadow-sm">
		// 				<div className="flex items-center gap-4">
		// 					<img src={t.img} className="w-14 h-14 rounded-full" alt="" />
		// 					<div>
		// 						<h2 className="font-semibold text-lg">{t.name}</h2>
		// 						<p className="text-gray-700 text-sm">{t.role}</p>
		// 					</div>
		// 				</div>

		// 				<p className="mt-3 text-gray-600">{t.desc}</p>

		// 				<div className="mt-4 flex flex-wrap gap-2">
		// 					{t.skills.map((s, j) => (
		// 						<span
		// 							key={j.id}
		// 							className="bg-white border border-purple-300 text-purple-700 px-3 py-1 rounded-full text-sm"
		// 						>
		// 							{s}
		// 						</span>
		// 					))}
		// 				</div>
		// 			</div>
		// 		))}
		// 	</div>

		// 	<div className="px-10 py-10 flex items-center justify-center gap-3">
		// 		{[1, 2, 3, 4, 5].map((n) => (
		// 			<button
		// 				type="button"
		// 				key={n}
		// 				className={`px-4 py-2 rounded-full ${
		// 					n === 1 ? "bg-purple-600 text-white" : "bg-gray-200"
		// 				}`}
		// 			>
		// 				{n}
		// 			</button>
		// 		))}
		// 	</div>
		// </div>
		<div className="w-full h-screen flex items-center justify-center">
			<h1 className="text-purple-600 text-3xl mx-auto my-auto  ">
				Comming Soon
			</h1>
		</div>
	);
}
