import * as  Yup from 'yup';

// // Base validation schema

 const emailschema = Yup.string().email("Invalid email")

const passwordschema = Yup
.string()
.min(8, "Password must be at least 8 characters")
.max(32, "Password must be at most 32 characters")
.matches(/[A-Z]/, "Password must include uppercase letters")
.matches(/[a-z]/, "Password must include lowercase letters")
.matches(/[0-9]/, "Password must include numbers")
.matches(/[^A-Za-z0-9]/, "Password must include special characters")
.matches(/^(?!.*(.)\1\1).*$/, "Password cannot contain three repeating characters");


//const roleSchema = Yup.string().oneOf(["TALENT", "EMPLOYER"], "Role must be either TALENT or EMPLOYER");

const name = Yup
 .string()
  .matches(/^\S+\s+\S+/, "Please enter your full name")

export const registerSchema =  
    
    Yup.object().shape({
            name: name.required("Name is required"),
            email: emailschema.required("Email is required"),
            password: passwordschema.required("Password is required"),
             rePassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  //           role: roleSchema.required("Role is required"),
    })

 
