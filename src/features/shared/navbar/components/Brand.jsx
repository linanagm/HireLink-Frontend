import { NavLink } from "react-router-dom";
import logo from "../../../../assets/images/HL.svg";

export function Brand() {
	return (
		<NavLink
			to="/"
			className="flex items-center space-x-2"
			aria-label="HireLink Home"
		>
			<img src={logo} className="h-7" alt="HireLink Logo" />
		</NavLink>
	);
}
