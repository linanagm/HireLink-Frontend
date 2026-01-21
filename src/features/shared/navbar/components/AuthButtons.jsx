import { NavLink } from "react-router-dom";

/**
 * Renders a list of authentication-related links.
 * This component is used in the navbar to provide links to the login and sign up pages.
 * @returns {JSX.Element} - A JSX element representing a list of authentication-related links.
 */
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
