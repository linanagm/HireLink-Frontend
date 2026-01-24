import { NavLink } from "react-router-dom";
import logo from "../../../../assets/images/HL.svg";

/**
 * Component for displaying the HireLink logo in the navbar.
 * @return {JSX.Element} - The component containing the HireLink logo.
 */
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
