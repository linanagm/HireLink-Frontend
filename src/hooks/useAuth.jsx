import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook to access the AuthContext.
 *
 * Returns an object containing the following properties:
 *   - token: The user's authentication token.
 *   - currentUser: The user's data as an object.
 *   - isAuthenticated: A boolean indicating whether the user is authenticated.
 *   - setUser: A function to set the user's data.
 *   - saveLogin: A function to save the user's authentication token and data.
 *   - logout: A function to log the user out and clear their authentication token and data.
 *
 * @returns {Object} An object containing the user's authentication data and functions.
 */
export function useAuth() {
	return useContext(AuthContext);
}
