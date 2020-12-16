import * as yup from "yup";

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validateRegister = yup.object({
  userName: yup
    .string()
    .min(3, "3 simvoldan az olmamalıdır")
    .max(20, "20 simvoldan çox olmamalıdır")
    .required("İsdifadəçi adı qeyd olunmayıb"),
  // email: yup.string().email("Email düzgün deyil").required("Email qeyd olunmayıb"),
  password: yup
    .string()
    .min(6, "6 simvoldan az olmamalıdır")
    .max(20, "20 simvoldan çox olmamalıdır")
    .required("Şifrə qeyd olunmayıb"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifrələr eyni olmalıdır")
    .required("Şifrə qeyd olunmayıb"),
  // name: yup
  //     .string()
  //     .min(3, "3 simvoldan az olmamalıdır")
  //     .max(20, "20 simvoldan çox olmamalıdır")
  //     .required("Ad qeyd olunmayıb"),
  // surname: yup
  //     .string()
  //     .min(3, "3 simvoldan az olmamalıdır")
  //     .max(20, "20 simvoldan çox olmamalıdır")
  //     .required("Soyad qeyd olunmayıb"),
  // phoneNumber: yup
  //     .string()
  //     // .matches(phoneRegExp, 'Yalnız rəqəm daxil olunmalıdır')
  //     .min(9, "9 simvoldan az olmamalıdır")
  //     .max(20, "20 simvoldan çox olmamalıdır")
  //     .required("Telefon nömrəsi qeyd olunmayıb"),
  // address: yup
  //     .string()
  //     .min(3, "3 simvoldan az olmamalıdır")
  //     .max(50, "50 simvoldan çox olmamalıdır")
  //     .required("Ünvan qeyd olunmayıb"),
});

export default validateRegister;
