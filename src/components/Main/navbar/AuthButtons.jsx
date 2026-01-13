import { NavLink } from "react-router-dom";

export function AuthButtons() {
	return (
		<ul className="flex gap-7">
			<li>
				<NavLink className="my-btn-outline px-4 py-2.5" to="/login">
					Login
				</NavLink>
			</li>
			<li>
				<NavLink className="my-btn-solid px-4 py-2.5" to="/register">
					Sign up
				</NavLink>
			</li>
		</ul>
	);
}
