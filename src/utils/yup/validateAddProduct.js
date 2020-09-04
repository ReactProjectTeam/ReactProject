import * as yup from "yup";


const validateAddProduct = yup.object({
    title: yup
        .string()
        .min(3, "3 simvoldan az olmamalıdır")
        .max(30, "30 simvoldan çox olmamalıdır")
        .required("Elanın adı qeyd olunmayıb"),
    description: yup
        .string()
        .min(3, "3 simvoldan az olmamalıdır")
        .max(500, "500 simvoldan çox olmamalıdır")
        .required("Elavə məlumat adı qeyd olunmayıb"),
    ownerName: yup
        .string()
        .min(3, "3 simvoldan az olmamalıdır")
        .max(20, "20 simvoldan çox olmamalıdır")
        .required("Ad qeyd olunmayıb"),
    ownerPhoneNumber: yup
        .string()
        .min(9, "9 simvoldan az olmamalıdır")
        .max(9, "9 simvoldan çox olmamalıdır")
        .required("Telefon nömrəsi qeyd olunmayıb"),
    ownerAddress: yup
        .string()
        .min(3, "3 simvoldan az olmamalıdır")
        .max(50, "50 simvoldan çox olmamalıdır")
        .required("Ünvan qeyd olunmayıb"),
});

export default validateAddProduct;