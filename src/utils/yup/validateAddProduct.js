import * as yup from "yup";

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// Yup.object().shape({
//     categoryId: Yup.string().required("Color is required!")
// }),

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
        // .matches(phoneRegExp, 'Yalnız rəqəm daxil olunmalıdır')
        .min(9, "9 simvoldan az olmamalıdır")
        .max(20, "20 simvoldan çox olmamalıdır")
        .required("Telefon nömrəsi qeyd olunmayıb"),
    ownerAddress: yup
        .string()
        .min(3, "3 simvoldan az olmamalıdır")
        .max(50, "50 simvoldan çox olmamalıdır")
        .required("Ünvan qeyd olunmayıb"),
}).shape({
    categoryId: yup.string().required("Kateqoriya seçilməyib"),
    subCategoryId: yup.string().when("categoryId", {
        is: (categoryId)=> categoryId != 12,
        then: yup.string().required("Alt kateqoriya sechilmeyib")
    }),
    cityId: yup.string().required("Şəhər seçilməyib"),
});



export default validateAddProduct;