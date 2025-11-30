import * as Yup from "yup";


export const SignUpSchema = Yup.object().shape({
    name: Yup.string().min( 2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must contain at least 6 characters, including at least one letter and one number")
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});