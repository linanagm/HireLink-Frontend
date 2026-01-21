import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useCurrentUser } from "../hooks/queries/useCurrentUser";
import { logoutRes } from "../services/auth.service";

// AuthContext will be used by the whole app to access auth data
export const AuthContext = createContext(null);

// Keys we use in localStorage / sessionStorage
const STORAGE_KEYS = {
	token: "token",
	user: "user",
	jwt: "jwt",
};

// Read from localStorage first, if not found check sessionStorage
const readFromStorage = (key) => {
	return localStorage.getItem(key) ?? sessionStorage.getItem(key);
};

// Safely parse JSON from storage
// If parsing fails, return null instead of crashing the app
const safeJsonParse = (value) => {
	if (!value) return null;
	try {
		return JSON.parse(value);
	} catch {
		return null;
	}
};

/**
 * AuthProvider
 * ------------
 * This component wraps the app and controls authentication state.
 *
 * What it stores:
 * - token: auth token from backend
 * - currentUser: logged-in user data
 *
 * What it provides:
 * - saveLogin: save token after login
 * - setUser: save user data
 * - updateCurrentUser: update part of user data (example: avatar)
 * - logout: clear everything
 */
export function AuthProvider({ children }) {
	// Token state (null means not logged in)
	const [token, setToken] = useState(null);

	// User object (null until we fetch it)
	const [currentUser, setCurrentUser] = useState(null);

	// Simple boolean to know if user is logged in
	const isAuthenticated = Boolean(token);

	/**
	 * Save user data in state and storage
	 * We detect which storage is used based on where the token exists
	 */
	const setUser = useCallback((userData) => {
		setCurrentUser(userData);

		const storage = localStorage.getItem(STORAGE_KEYS.token)
			? localStorage
			: sessionStorage;

		if (userData) {
			storage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
		}
	}, []);

	/**
	 * Logout the user
	 * Clears token and user from state and storage
	 */
	const logout = useCallback(async () => {
		await logoutRes();
		localStorage.clear();
		sessionStorage.clear();

		setToken(null);
		setCurrentUser(null);
	}, []);

	/**
	 * Update current user data
	 * Can accept:
	 * - a function (prev => newUser)
	 * - or a partial object ({ avatar: "newUrl" })
	 *
	 * Also keeps storage updated so refresh doesn’t lose changes
	 */
	const updateCurrentUser = useCallback((updater) => {
		setCurrentUser((prev) => {
			const next =
				typeof updater === "function" ? updater(prev) : { ...prev, ...updater };

			const storage = localStorage.getItem(STORAGE_KEYS.token)
				? localStorage
				: sessionStorage;

			if (next) {
				storage.setItem(STORAGE_KEYS.user, JSON.stringify(next));
			}

			return next;
		});
	}, []);

	/**
	 * On app start:
	 * - read token and user from storage
	 * - restore login state if exists
	 */
	useEffect(() => {
		const savedToken = readFromStorage(STORAGE_KEYS.token);
		const savedUser = safeJsonParse(readFromStorage(STORAGE_KEYS.user));

		if (savedToken) setToken(savedToken);
		if (savedUser) setCurrentUser(savedUser);
	}, []);

	const hasUser = !!currentUser;

	/**
	 * Fetch current user from API only when:
	 * - we have a token
	 * - but we don’t have user data yet
	 */
	useCurrentUser({
		token,
		enabled: !!token && !hasUser,
		onUser: setUser,
		onLogout: logout,
	});

	/**
	 * Save token after login
	 * rememberMe decides if token goes to localStorage or sessionStorage
	 */
	const saveLogin = useCallback((newToken, rememberMe) => {
		const storage = rememberMe ? localStorage : sessionStorage;

		setToken(newToken);
		storage.setItem(STORAGE_KEYS.token, newToken);
	}, []);

	/**
	 * Memoized context value
	 * Prevents unnecessary re-renders
	 */
	const value = useMemo(
		() => ({
			token,
			currentUser,
			updateCurrentUser,
			isAuthenticated,
			setUser,
			saveLogin,
			logout,
		}),
		[
			token,
			currentUser,
			isAuthenticated,
			updateCurrentUser,
			setUser,
			saveLogin,
			logout,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
