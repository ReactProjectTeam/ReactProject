import * as yup from "yup";


const validateAddProduct = yup.object({
    title: yup
        .string()
        .min(3, "Product Name length minimum 3 symbols")
        .max(50, "too long Product Name")
        .required("Product Name required"),
    description: yup
        .string()
        .min(3, "Description length minimum 3 symbols")
        .max(50, "too long Description")
        .required("Description required"),
    ownerName: yup
        .string()
        .min(3, "Owner Name length minimum 3 symbols")
        .max(50, "too long Owner Name")
        .required("Owner Name required"),
    ownerPhoneNumber: yup
        .string()
        .min(10, "PhoneNumber length minimum 10 symbols")
        .max(50, "too long PhoneNumber")
        .required("PhoneNumber required"),
    ownerAddress: yup
        .string()
        .min(3, "Owner Address length minimum 3 symbols")
        .max(50, "too long Owner Address")
        .required("Owner Address required"),
});

export default validateAddProduct;