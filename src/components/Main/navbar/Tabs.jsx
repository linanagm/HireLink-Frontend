import { NavLink } from "react-router-dom";

export function Tabs({ tabs }) {
	return (
		<div className="hidden md:flex">
			<ul className="flex font-medium space-x-8 p-0">
				{tabs.map((tab) => (
					<li key={tab.to}>
						<NavLink
							to={tab.to}
							end
							className={({ isActive }) =>
								`block py-2 text-neutral-800 hover:text-fuchsia-800 ${
									isActive ? "text-fg-brand" : ""
								}`
							}
						>
							{tab.label}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}
