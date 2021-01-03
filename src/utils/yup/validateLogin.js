import * as yup from "yup";

const validateLogin = yup.object({
  // userName: yup
  //   .string()
  //   .min(3, "3 simvoldan az olmamalıdır")
  //   .max(20, "20 simvoldan çox olmamalıdır")
  //   .required("Istifadəçi adı qeyd olunmayıb"),
  email: yup.string().email("Email düzgün deyil").required("Email qeyd olunmayıb"),
  password: yup
    .string()
    .min(6, "6 simvoldan az olmamalıdır")
    .max(20, "20 simvoldan çox olmamalıdır")
    .required("Şifrə qeyd olunmayıb"),
});

export default validateLogin;
