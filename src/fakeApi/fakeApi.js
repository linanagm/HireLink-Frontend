
//get users from local storage
function getUsers () {
  console.log("local storage users: ",JSON.parse(localStorage.getItem("users")) || [] );
  
    return JSON.parse(localStorage.getItem("users")) || [];

}


//save users to local storage
function saveUsers(users) {
  return localStorage.setItem("users", JSON.stringify(users));
}

// ============================
//      SIGN UP
// ============================
export function signup({ name, email, password, role }) {
     
  // 1- get all users from local storage
  let users = getUsers();

 // 2- check if email already exists
  if(users.find(u => u.email === email )) return { status: 400, success: false, message: "Email already exists" };
 
  // 3- generate fake token -> will delete it later
  const verificationToken = "token_" + Math.random().toString(36).substring(2);
 
  // 4- create new user 
  const newUser = {name, email, password, role, isVerified: false, createdAt: new Date().toISOString()};

  // 5- add new user to users array
  users.push(newUser);

  //6- save users array to local storage
  saveUsers(users);

  

  return {
    status: 200,
    success: true,
    message: "user created successfully",
    
    //will delete it later
    verificationLink: `verify?token=${verificationToken}&email=${email}`,
    
    data: null
  };
}

// // ============================
// //       VERIFY EMAIL
// // ============================
export function verifyEmail(email) {

  let users = getUsers();

  let user = users.find(u => u.email === email);

  if (!user) {
    return { status: 404, success: false, message: "User not found" };
  }

  user.isVerified = true;
  saveUsers(users);

  return {
    status: 200,
    success: true,
    message: "Email verified successfully"
  };
}

// // ============================
// //          LOGIN
// // ============================
export function login({ email, password }) {
    // 1- get all users
  let users = getUsers();

  // 2- check if email and password are valid
  if (!email || !password) {
    return { status: 400, success: false, message: "Email and password are required" };
  }

  
  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return { status: 401, success: false, message: "Invalid email or password" };
  }

  if (!user.isVerified) {
    return { status: 403, success: false, message: "Please verify your email first" };
  }

  const accessToken = "access_" + Math.random().toString(36).slice(2);
  const refreshToken = "refresh_" + Math.random().toString(36).slice(2);
  
  const session = {
    email: user.email,
    accessToken,
    refreshToken,
    expiresAt: Date.now() + 15 * 60 * 1000
  };

  localStorage.setItem("session", JSON.stringify(session));

  return {
    status: 200,
    success: true,
    message: "Login successful",
    data: session
  };
}

// // ============================
// //     REFRESH ACCESS TOKEN
// // ============================
// export function refreshAccessToken() {
//   let session = JSON.parse(localStorage.getItem("session"));

//   if (!session) {
//     return { status: 401, success: false, message: "No active session" };
//   }

//   const newAccess = "access_" + Math.random().toString(36).slice(2);
//   session.accessToken = newAccess;
//   session.expiresAt = Date.now() + 15 * 60 * 1000;

//   localStorage.setItem("session", JSON.stringify(session));

//   return {
//     status: 200,
//     success: true,
//     message: "Token refreshed",
//     data: { accessToken: newAccess }
//   };
// }

// // ============================
// //        GET USER
// // ============================
// export function getUser() {
//   let users = getUsers();

//   let session = JSON.parse(localStorage.getItem("session"));
//   if (!session) {
//     return { status: 401, success: false, message: "Not logged in" };
//   }

  
//   let user = users.find(u => u.email === session.email);

//   if (!user) {
//     return { status: 404, success: false, message: "User not found" };
//   }

//   return {
//     status: 200,
//     success: true,
//     message: "User data loaded",
//     data: {
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       isVerified: user.isVerified
//     }
//   };
// }

// // ============================
// //           LOGOUT
// // ============================
// export function logout() {
//   localStorage.removeItem("session");

//   return {
//     status: 200,
//     success: true,
//     message: "Logged out successfully"
//   };
// }
// -------------------------------------------------------------------




