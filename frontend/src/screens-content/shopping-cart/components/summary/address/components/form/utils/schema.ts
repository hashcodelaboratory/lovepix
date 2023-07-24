import * as yup from 'yup'

const phoneRegExp = /^([0-9]{10})|((\+421)[0-9]{9})$/

export const FORM_SCHEMA = yup
  .object({
    firstName: yup.string().required('firstNameValidation'),
    lastName: yup.string().required('lastNameValidation'),
    address: yup.string().required('addressValidation'),
    city: yup.string().required('cityValidation'),
    postalCode: yup.string().required('postalCodeValidation'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Telefon nemá správný formát.')
      .required('phoneValidation'),
    email: yup.string().email().required('emailValidation'),
    delivery: yup.string().required('deliveryValidation'),
    payment: yup.string().required('paymentValidation'),
  })
  .required()
