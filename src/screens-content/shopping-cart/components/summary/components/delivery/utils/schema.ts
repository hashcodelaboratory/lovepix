import * as yup from "yup";

export const SUMMARY_SCHEMA = yup.object({
    delivery: yup.string().required("deliveryValidation"),
    payment: yup.string().required("paymentValidation"),
}).required();