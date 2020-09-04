import * as yup from "yup";


const validateUserInfo = yup.object({
    email: yup.string().email("Email düzgün deyil").required("Email qeyd olunmayıb"),
    password: yup
        .string()
        .min(6, "6 simvoldan az olmamalıdır")
        .max(20, "20 simvoldan çox olmamalıdır")
        .required("Şifrə qeyd olunmayıb"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Şifrələr eyni olmalıdır")
        .required("Şifrə qeyd olunmayıb"),
    name: yup
        .string()
        .min(3, "3 simvoldan az olmamalıdır")
        .max(20, "20 simvoldan çox olmamalıdır")
        .required("Ad qeyd olunmayıb"),
    surname: yup
        .string()
        .min(3, "3 simvoldan az olmamalıdır")
        .max(20, "20 simvoldan çox olmamalıdır")
        .required("Soyad qeyd olunmayıb"),
    phoneNumber: yup
        .string()
        .min(9, "9 simvoldan az olmamalıdır")
        .max(9, "9 simvoldan çox olmamalıdır")
        .required("Telefon nömrəsi qeyd olunmayıb"),
    address: yup
        .string()
        .min(3, "3 simvoldan az olmamalıdır")
        .max(50, "50 simvoldan çox olmamalıdır")
        .required("Ünvan qeyd olunmayıb"),
});

export default validateUserInfo;