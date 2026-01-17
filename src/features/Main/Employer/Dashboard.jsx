import React, { useState } from "react";

const Dashboard = () => {
	const [activeTab, setActiveTab] = useState("jobs");

	const jobs = [
		{
			id: 1,
			title: "UI/UX Designer",
			posted: "Mar 20, 2025",
			status: "Open",
			applicants: 10,
		},
		{
			id: 2,
			title: "Frontend Developer",
			posted: "Mar 5, 2025",
			status: "Closed",
			applicants: 52,
		},
		{
			id: 3,
			title: "Data Analyst",
			posted: "Jun 5, 2025",
			status: "Open",
			applicants: 18,
		},
		{
			id: 4,
			title: "Sales Executive",
			posted: "Aug 30, 2025",
			status: "Open",
			applicants: 20,
		},
		{
			id: 5,
			title: "Content Writer",
			posted: "Sep 15, 2025",
			status: "Pending",
			applicants: 15,
		},
	];

	const applicants = [
		{
			id: 1,
			name: "Hana A.",
			job: "UI/UX Designer",
			date: "Apr 27, 2025",
			status: "Under Review",
		},
		{
			id: 2,
			name: "Liam R.",
			job: "Frontend Developer",
			date: "Apr 30, 2025",
			status: "Interview",
		},
		{
			id: 3,
			name: "Sofia M.",
			job: "Product Manager",
			date: "May 2, 2025",
			status: "Received",
		},
		{
			id: 4,
			name: "Ethan K.",
			job: "Data Analyst",
			date: "May 5, 2025",
			status: "Under Review",
		},
		{
			id: 5,
			name: "Aria J.",
			job: "Marketing Specialist",
			date: "May 8, 2025",
			status: "Offer",
		},
	];

	const talents = [
		{
			name: "Samantha K. Brown",
			role: "UX/UI Designer",
			desc: "Senior Software Engineer with 10 years experience in AI and Machine Learning",
			skills: ["Figma", "Wireframing", "Prototyping"],
			img: "https://i.pravatar.cc/100?img=12",
		},
		{
			name: "James T. Lee",
			role: "Product Designer",
			desc: "Creative Product Designer with mobile focus",
			skills: ["Sketch", "Interaction Design"],
			img: "https://i.pravatar.cc/100?img=21",
		},
		{
			name: "Olivia H. Carter",
			role: "Web Developer",
			desc: "React and responsive design",
			skills: ["HTML", "JavaScript"],
			img: "https://i.pravatar.cc/100?img=32",
		},
	];

	return (
		<div
			style={{
				padding: "20px",
				backgroundColor: "#f5f5f5",
				minHeight: "100vh",
			}}
		>
			<h1 style={{ fontSize: "28px", marginBottom: "10px" }}>Job Dashboard</h1>
			<p style={{ color: "#666", marginBottom: "20px" }}>
				Manage jobs and applicants
			</p>

			<div style={{ marginBottom: "20px", borderBottom: "1px solid #ddd" }}>
				<button
					type="button"
					onClick={() => setActiveTab("jobs")}
					style={{
						padding: "10px 20px",
						backgroundColor: activeTab === "jobs" ? "white" : "transparent",
						color: activeTab === "jobs" ? "#2563eb" : "#666",
					}}
				>
					Jobs
				</button>

				<button
					type="button"
					onClick={() => setActiveTab("applicants")}
					style={{
						padding: "10px 20px",
						backgroundColor:
							activeTab === "applicants" ? "white" : "transparent",
						color: activeTab === "applicants" ? "#2563eb" : "#666",
					}}
				>
					Applicants
				</button>

				<button
					type="button"
					onClick={() => setActiveTab("talents")}
					style={{
						padding: "10px 20px",
						backgroundColor: activeTab === "talents" ? "white" : "transparent",
						color: activeTab === "talents" ? "#2563eb" : "#666",
					}}
				>
					Talents
				</button>
			</div>

			{/* JOBS */}
			{activeTab === "jobs" && (
				<div style={{ backgroundColor: "white", borderRadius: "8px" }}>
					<div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
						<h2 style={{ fontSize: "20px" }}>Jobs List</h2>
					</div>

					<div style={{ overflowX: "auto" }}>
						<table style={{ width: "100%", borderCollapse: "collapse" }}>
							<thead style={{ backgroundColor: "#f9fafb" }}>
								<tr>
									<th style={{ padding: "12px 16px" }}>Job Title</th>
									<th style={{ padding: "12px 16px" }}>Posted On</th>
									<th style={{ padding: "12px 16px" }}>Status</th>
									<th style={{ padding: "12px 16px" }}>Applicants</th>
								</tr>
							</thead>
							<tbody>
								{jobs.map((job) => (
									<tr key={job.id} style={{ borderBottom: "1px solid #eee" }}>
										<td style={{ padding: "16px" }}>{job.title}</td>
										<td style={{ padding: "16px" }}>{job.posted}</td>
										<td style={{ padding: "16px" }}>{job.status}</td>
										<td style={{ padding: "16px" }}>{job.applicants}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* APPLICANTS */}
			{activeTab === "applicants" && (
				<div style={{ backgroundColor: "white", borderRadius: "8px" }}>
					<div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
						<h2 style={{ fontSize: "20px" }}>Recent Applicants</h2>
					</div>

					<div style={{ overflowX: "auto" }}>
						<table style={{ width: "100%", borderCollapse: "collapse" }}>
							<thead style={{ backgroundColor: "#f9fafb" }}>
								<tr>
									<th style={{ padding: "12px 16px" }}>Name</th>
									<th style={{ padding: "12px 16px" }}>Job Applied</th>
									<th style={{ padding: "12px 16px" }}>Date</th>
									<th style={{ padding: "12px 16px" }}>Status</th>
								</tr>
							</thead>
							<tbody>
								{applicants.map((p) => (
									<tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
										<td style={{ padding: "16px" }}>{p.name}</td>
										<td style={{ padding: "16px" }}>{p.job}</td>
										<td style={{ padding: "16px" }}>{p.date}</td>
										<td style={{ padding: "16px" }}>{p.status}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* TALENTS */}
			{activeTab === "talents" && (
				<div
					style={{
						backgroundColor: "white",
						borderRadius: "12px",
						padding: "20px",
					}}
				>
					<p style={{ fontSize: "20px", marginBottom: "20px" }}>Talent List</p>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
							gap: "20px",
						}}
					>
						{talents.map((t, i) => (
							<div
								key={i}
								style={{
									backgroundColor: "#f3e8ff",
									padding: "15px",
									borderRadius: "12px",
								}}
							>
								<div
									style={{ display: "flex", alignItems: "center", gap: "10px" }}
								>
									<img
										src={t.img}
										style={{
											width: "50px",
											height: "50px",
											borderRadius: "50%",
										}}
									/>
									<div>
										<p style={{ fontWeight: "600" }}>{t.name}</p>
										<p style={{ color: "#555", fontSize: "14px" }}>{t.role}</p>
									</div>
								</div>

								<p
									style={{ marginTop: "10px", color: "#555", fontSize: "14px" }}
								>
									{t.desc}
								</p>

								<div
									style={{
										marginTop: "10px",
										display: "flex",
										gap: "6px",
										flexWrap: "wrap",
									}}
								>
									{t.skills.map((s, j) => (
										<span
											key={j}
											style={{
												backgroundColor: "white",
												border: "1px solid #d8b4fe",
												padding: "4px 10px",
												borderRadius: "20px",
												fontSize: "12px",
												color: "#6b21a8",
											}}
										>
											{s}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
