import * as yup from 'yup'

export const FORM_SCHEMA = yup
  .object({
    firstName: yup.string().required('firstNameValidation'),
    lastName: yup.string().required('lastNameValidation'),
    address: yup.string().required('addressValidation'),
    city: yup.string().required('cityValidation'),
    postalCode: yup.string().required('postalCodeValidation'),
    phone: yup.string().required('phoneValidation'),
    email: yup.string().email().required('emailValidation'),
    delivery: yup.string().required('deliveryValidation'),
    payment: yup.string().required('paymentValidation'),
  })
  .required()
