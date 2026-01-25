import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useCurrentUser } from "../hooks/queries/useCurrentUser";
import {
	clearAccessToken,
	getAccessToken,
	setAccessToken,
} from "../lib/tokenStore";
import { getRefreshToken, getUser, logoutRes } from "../services/auth.service";

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

	// Boolean to know if auth is ready
	const [isAuthReady, setIsAuthReady] = useState(false);

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
		try {
			console.log("logout clicked");

			const res = await logoutRes();
			console.log("logout res", res);
		} finally {
			clearAccessToken();
			localStorage.removeItem(STORAGE_KEYS.user);
			sessionStorage.removeItem(STORAGE_KEYS.user);
			setToken(null);
			setCurrentUser(null);
		}
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

	useEffect(() => {
		const initAuth = async () => {
			try {
				const savedToken = getAccessToken();
				const savedUser = safeJsonParse(readFromStorage("user"));

				if (savedUser) setCurrentUser(savedUser);

				if (savedToken) {
					setToken(savedToken);
					// user is not loaded yet
					setIsAuthReady(true);
					return;
				}

				// If no token, try to refresh
				const refreshRes = await getRefreshToken();
				if (refreshRes.ok) {
					const newToken = refreshRes.data?.token;
					if (newToken) {
						setAccessToken(newToken);
						setToken(newToken);

						const meRes = await getUser();
						if (meRes.ok) setCurrentUser(meRes.data);
					}
				} else {
					clearAccessToken();
					setToken(null);
					setCurrentUser(null);
				}
			} finally {
				setIsAuthReady(true); // auth is ready
			}
		};

		initAuth();
	}, []);

	const hasUser = !!currentUser;

	/**
	 * Fetch current user from API only when:
	 * - we have a token
	 * - but we don’t have user data yet
	 */
	useCurrentUser({
		//enabled: !hasUser,
		enabled: isAuthReady && !!token && !hasUser,
		onUser: setUser,
		onLogout: logout,
	});

	/**
	 * Save token after login
	 * rememberMe decides if token goes to localStorage or sessionStorage
	 */
	const saveLogin = useCallback((newToken, rememberMe) => {
		setToken(newToken);
		setAccessToken(newToken, rememberMe);
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
			isAuthReady,
			isAuthenticated,
			setUser,
			saveLogin,
			logout,
		}),
		[
			token,
			currentUser,
			isAuthReady,
			isAuthenticated,
			updateCurrentUser,
			setUser,
			saveLogin,
			logout,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
