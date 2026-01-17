import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import achievementImage from "../../../assets/images/achievement.png";
// carsoul images
import a1 from "../../../assets/images/carousel/achievement1.svg";
import a2 from "../../../assets/images/carousel/achievement2.svg";
import a3 from "../../../assets/images/carousel/achievement3.svg";
import a4 from "../../../assets/images/carousel/achievement4.svg";
import a5 from "../../../assets/images/carousel/achievement5.svg";
import heroImage from "../../../assets/images/home.svg";
import bannarImage from "../../../assets/images/home-bannar.svg";
import AchievementCarousel from "../../../components/UI/AchievmentCarousel";
import Card from "../../../components/UI/Card";
import InfoCard from "../../../components/UI/InfoCard";
import StatCard from "../../../components/UI/StatCard";
import TestimonialCard from "../../../components/UI/TestimonialCard";

export default function Home() {
	const [Count, SetCount] = useState(0);

	useEffect(() => {}, []);

	const achievements = [
		{ value: "1000+", label: "Jobs posted", image: a1 },
		{ value: "1200+", label: "Active Users", image: a2 },
		{ value: "5000+", label: "Employers", image: a3 },
		{ value: "15000+", label: "Applicants", image: a4 },
		{ value: "65%", label: "Success rate", image: a5 },
	];

	return (
		<div className="container">
			<Helmet>
				<title>Home</title>
			</Helmet>

			<section className="hero-section flex  max-w-screen-xl justify-between items-center mx-auto py-7 ">
				<div className="flex-col  py-11 gap-5  ">
					<div className="flex  text-2xl font-bold ">
						<div className="flex-col py-11 gap-5">
							<h1 className="text-7xl py-4 font-bold text-black">
								<span className="text-fuchsia-800">Connecting</span> You to the
								World’s
								<span className="text-fuchsia-800"> Best Tech Talent.</span>
							</h1>

							<div className="flex flex-col justify-center items-center py-4">
								<span>
									Discover, evaluate, and hire top tech professionals for
									projects of any size. Flexible hiring models designed for your
									success.
								</span>
							</div>

							<NavLink
								to="/register"
								className="my-btn-outline text-success bg-neutral-primary border border-success hover:bg-success hover:text-white focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
							>
								Join Us
							</NavLink>
						</div>

						<img src={heroImage} alt="" />
					</div>
				</div>
			</section>

			{/* ================= Our Achievements ================= */}

			<div className="inline-block bg-fuchsia-800 text-white px-4 py-2 rounded-sm ml-3  font-semibold">
				Our Achievement
			</div>

			<section className="flex-col ">
				<AchievementCarousel items={achievements} />

				<div className="relative p-16">
					{/* Background Image */}
					<img
						src={bannarImage}
						alt="Our Achievement"
						className="absolute inset-0 w-full h-full object-cover opacity-100"
					/>

					{/* Content */}
					<div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
						<StatCard value="1200+" label="Active Users" />
						<StatCard value="5000+" label="Employers" />
						<StatCard value="24/7" label="Support" />
						<StatCard value="15000+" label="Applicants" />
						<StatCard value="65%" label="Success Rate" />
					</div>
				</div>
			</section>

			{/* ================= How It Works ================= */}

			<div className="inline-block bg-fuchsia-800 text-white px-4 py-2 rounded-sm ml-3 mt-10 font-semibold">
				How It Works
			</div>

			<section className="py-20 flex md:flex-row ml-6 ">
				<div className="w-1/2 ">
					<img src={achievementImage} alt="achievement illustrator" />
				</div>

				<div className=" grid grid-cols-1 gap-6 max-w-6xl mx-auto px-6">
					<Card
						title="Create an Account"
						text="Sign up as a Job Seeker or an Employer—it’s quick and free."
					/>
					<Card
						title="Explore & Post Opportunities"
						text="As Job Seeker browse jobs by role, or location. As Employers post your job listings and reach the right candidates."
					/>
					<Card
						title="Apply or Review Applicants"
						text="As Job Seekers apply instantly and track your applications. As Employers Filter, review, and shortlist applicants with ease."
					/>
					<Card
						title="Connect & Hire"
						text="Chat, schedule interviews, and make the perfect match—right from your dashboard."
					/>
				</div>
			</section>

			{/* ================= Why Choose Us ================= */}

			<div className="inline-block bg-fuchsia-800 text-white px-4 py-2 rounded-sm ml-3 mt-10 font-semibold">
				Why Choose Us?
			</div>

			<section className="py-20 ">
				<div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-6">
					<InfoCard
						title="Curated Job Matches"
						text="Smart matching ensures better opportunities for talents."
						icon="fa-solid fa-magnifying-glass text-fuchsia-800 text-lg"
					/>
					<InfoCard
						title="Fast & Transparent Hiring"
						text="Clear communication between employers and applicants."
						icon="fa-solid fa-stopwatch  text-fuchsia-800 text-lg"
					/>
					<InfoCard
						title="Verified Employers & Talent"
						text="We ensure trust through verification processes."
						icon="fa-solid fa-shield-halved text-fuchsia-800 text-lg"
					/>
					<InfoCard
						title="Built for Every Career Stage"
						text="From entry-level to executive, freelance to full-time—we’ve got something for everyone."
						icon="fa-solid fa-arrows-up-down-left-right text-fuchsia-800 text-lg "
					/>
					<InfoCard
						title="All-in-One Dashboard"
						text="Manage everything—applications, interviews, saved jobs, and candidate tracking—in one powerful, easy-to-use dashboard."
						icon="fa-solid fa-table-cells-large text-fuchsia-800 text-lg"
					/>
					<InfoCard
						title="Global Opportunities"
						text="Access jobs and talent worldwide, while filtering for region-specific relevance and cultural fit."
						icon="fa-solid fa-globe text-fuchsia-800 text-lg"
					/>
				</div>
			</section>

			{/* ================= Testimonials ================= */}
			<section className="py-20">
				<div className="inline-block bg-fuchsia-800 text-white px-4 py-2 rounded-sm ml-3 mt-10 font-semibold">
					Testimonials
				</div>

				<div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
					<TestimonialCard
						name="Emily Johnson"
						role="Software Engineer"
						text="This platform made finding a job fast and stress-free."
					/>
					<TestimonialCard
						name="Ahmed Ali"
						role="HR Manager"
						text="Hiring talent has never been this smooth and organized."
					/>
					<TestimonialCard
						name="Lydia Chen"
						role="Product Designer"
						text="Great user experience and real opportunities."
					/>
					<TestimonialCard
						name="Lydia Chen"
						role="Product Designer"
						text="Great user experience and real opportunities."
					/>
				</div>
			</section>
		</div>
	);
}
