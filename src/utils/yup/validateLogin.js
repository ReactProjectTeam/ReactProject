import * as yup from "yup";


const validateLogin = yup.object({
    email: yup.string().email("Email incorrect").required("Email required"),
    password: yup
        .string()
        .min(6, "Must be more than 6")
        .max(50, "Too long")
        .required("No password provided"),
});

export default validateLogin;