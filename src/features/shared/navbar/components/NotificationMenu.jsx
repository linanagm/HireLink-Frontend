import { Link } from "react-router-dom";

/**
 * A button to toggle the notifications menu
 *
 * @param {boolean} open - Whether the menu is open or not
 * @param {function} onToggle - Function to toggle the menu
 * @param {function} onClose - Function to close the menu
 */
export function NotificationsMenu({ open, onToggle, onClose }) {
	return (
		<li className="relative">
			<button
				type="button"
				onClick={onToggle}
				className="text-2xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
				aria-label="Notifications"
			>
				<i className="fa-regular fa-bell"></i>
			</button>

			{open && (
				<div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl border z-50">
					<ul className="p-2">
						<li>
							<Link
								className="p-2 block hover:bg-slate-100"
								to="#"
								onClick={onClose}
							>
								Notification
							</Link>
						</li>
					</ul>
				</div>
			)}
		</li>
	);
}
