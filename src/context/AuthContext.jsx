import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { getUser } from "../services/auth.service";

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

export function AuthProvider({ children }) {
	const [token, setToken] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	const isAuthenticated = Boolean(token);
	const setUser = useCallback((userData) => {
		setCurrentUser(userData);
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

	useCurrentUser({ token, onUser: setUser, onLogout: logout });

	const saveLogin = useCallback((newToken, rememberMe) => {
		const storage = rememberMe ? localStorage : sessionStorage;

		setToken(newToken);

		storage.setItem(STORAGE_KEYS.token, newToken);

		const userData = getUser();

		setCurrentUser(userData);
		if (userData) {
			setCurrentUser(userData);
			storage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
		}
	}, []);

	const value = useMemo(
		() => ({ token, currentUser, isAuthenticated, setUser, saveLogin, logout }),
		[token, currentUser, isAuthenticated, setUser, saveLogin, logout],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
