// import axiosClient from "./axiosClient";


// export async function createProfile({ email, password, profileData }) {
// 	const verificationToken = generateToken();
//     axiosClient.post('/auth/verify-email', {email, verificationToken});



// 	return prisma.user.create({
// 		data: {
			
// 			email,
// 			password,
// 			verificationToken,
// 			verificationExpiresAt: new Date(
// 				Date.now() + parseExpiry(env.EMAIL_VERIFICATION_EXPIRY),
// 			),
// 			role: Role.TALENT,
// 			talentProfile: {
// 				create: {
// 					// ! TALENT, DO NOT CREATE EMPLOYER PROFILE
// 					id: generateUlid(),
// 					...profileData,
// 				},
// 			},
// 		},
// 		include: {
// 			talentProfile: true,
// 		},
// 	});
// }
