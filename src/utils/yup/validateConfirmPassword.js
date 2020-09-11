import * as yup from "yup";


const validateConfirmPassword = yup.object({
    email: yup.string().email("Email düzgün deyil").required("Email qeyd olunmayıb"),
});

export default validateConfirmPassword;