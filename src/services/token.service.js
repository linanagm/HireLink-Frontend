import { jwtDecode } from "jwt-decode";

export const getCurrentUserId = (token) => {
	const currentUserData = token.data ? token.data : jwtDecode(token) || null;
	return currentUserData;
};
