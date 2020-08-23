import * as yup from "yup";


const validateRegister = yup.object({
    email: yup.string().email("Email incorrect").required("Email required"),
    password: yup
        .string()
        .min(6, "Must be more than 6")
        .max(50, "Too long")
        .required("No password provided"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Password must match")
        .required("No password confirmation provided"),
    name: yup
        .string()
        .min(3, "Name length minimum 3 symbols")
        .max(50, "too long Name")
        .required("Name required"),
    surname: yup
        .string()
        .min(3, "Surname length minimum 3 symbols")
        .max(50, "too long Surname")
        .required("Surname required"),
    phoneNumber: yup
        .string()
        .min(10, "PhoneNumber length minimum 10 symbols")
        .max(50, "too long PhoneNumber")
        .required("PhoneNumber required"),
    address: yup
        .string()
        .min(3, "Address length minimum 3 symbols")
        .max(50, "too long Address")
        .required("Address required"),
});

export default validateRegister;