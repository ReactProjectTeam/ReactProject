import * as yup from "yup";


const validateForgotPassword = yup.object({
    password: yup
        .string()
        .min(6, "6 simvoldan az olmamalıdır")
        .max(20, "20 simvoldan çox olmamalıdır")
        .required("Şifrə qeyd olunmayıb"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Şifrələr eyni olmalıdır")
        .required("Şifrə qeyd olunmayıb"),
});

export default validateForgotPassword;