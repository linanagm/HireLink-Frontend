import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

// Create context
export const AuthContext = createContext(null);

const STORAGE_KEYS = {
	token: "token",
	user: "user",
};

const readFromStorage = (key) => {
	return localStorage.getItem(key) ?? sessionStorage.getItem(key);
};

const removeFromBothStorages = (key) => {
	localStorage.removeItem(key);
	sessionStorage.removeItem(key);
};

const safeJsonParse = (value) => {
	if (!value) return null;
	try {
		return JSON.parse(value);
	} catch {
		return null;
	}
};

/**
 * AuthProvider is a React Context that provides authentication-related state and functions to its children.
 *
 * It manages the following state variables:
 * - `token`: The authentication token.
 * - `currentUser`: The currently logged-in user.
 * - `isAuthenticated`: A boolean indicating whether the user is authenticated or not.
 *
 * It also provides the following functions to its children:
 * - `setUser`: A function to set the currently logged-in user.
 * - `saveLogin`: A function to save a new authentication token and optionally remember the user.
 * - `logout`: A function to logout the currently logged-in user.
 */
export function AuthProvider({ children }) {
	const [token, setToken] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	const isAuthenticated = Boolean(token);
	const setUser = useCallback((userData) => {
		setCurrentUser(userData);

		// Save user data to localStorage
		const storage = localStorage.getItem(STORAGE_KEYS.token)
			? localStorage
			: sessionStorage;

		if (userData) storage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
	}, []);

	const logout = useCallback(() => {
		removeFromBothStorages(STORAGE_KEYS.token);
		removeFromBothStorages(STORAGE_KEYS.user);

		setToken(null);
		setCurrentUser(null);
	}, []);

	useEffect(() => {
		const savedToken = readFromStorage(STORAGE_KEYS.token);
		const savedUser = safeJsonParse(readFromStorage(STORAGE_KEYS.user));

		if (savedToken) setToken(savedToken);
		if (savedUser) setCurrentUser(savedUser);
	}, []);

	// only fetch the current user if we have a token or user
	useCurrentUser({
		token,
		hasUser: !!currentUser,
		onUser: setUser,
		onLogout: logout,
	});

	const saveLogin = useCallback((newToken, rememberMe) => {
		const storage = rememberMe ? localStorage : sessionStorage;

		setToken(newToken);

		storage.setItem(STORAGE_KEYS.token, newToken);

		// const userData = getUser(token);

		// setCurrentUser(userData);
		// if (userData) {
		// 	setCurrentUser(userData);
		// 	storage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
		// }
	}, []);

	const value = useMemo(
		() => ({ token, currentUser, isAuthenticated, setUser, saveLogin, logout }),
		[token, currentUser, isAuthenticated, setUser, saveLogin, logout],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
