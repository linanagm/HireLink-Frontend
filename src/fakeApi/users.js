import { getDB, saveDB } from "./apiHelpers";

// -----------------
// Users & Auth
// -----------------
export async function signup({ email, password, role }) {

  // 1- get all users from local storage
  const db = await getDB();
  console.log('db fakeapi ', db);
  
  // 2- check if email already exists
  if (db.users.find(u => u.email === email)) return { status: 400, success: false, message: "Email already exists" };

  //const verificationToken = "token_" + Math.random().toString(36).substring(2);
  
  // 3- create new user
  const newUser = {
    id: db.users.length + 1,
    email,
    password,
    role,
    isActive: true,
    emailVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };


  

  // 4- generate fake verification token 
  const verifyToken = `verify-user-${newUser.id}`;

  // 5- log verification token link
  console.log('fake verify email link: ', `http://localhost:5173/verify-email?token=${verifyToken}`);
  
  // 6- save new user to users array
  db.users.push(newUser);
  
  // 7-  save users to local storage
  saveDB(db);
  
  // 8- return success message
  return {
    statusCode: 200,
    success: true,
    message: "user created successfully",
    verifyTokenLink: `verify-email?token=${verifyToken}&email=${email}`,
    data: null
  }
}




export function login(email, password) {

  const db = getDB();

  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (!user) throw new Error("Invalid credentials");

  // generate fake tokens

  const accessToken = "fake-jwt-token-" + user.id;
  const refreshToken = "fake-jwt-refresh-token-" + user.id;
  
  
  return { tokens: { accessToken, refreshToken }, user };
  
//     statusCode: 200,
//     success: true,
//     message: "user created successfully",
//     verificationLink: `verify-email?token=${verificationToken}&email=${email}`,
//     data: null
//   };

}

