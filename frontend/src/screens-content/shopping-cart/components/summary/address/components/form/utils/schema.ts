import * as yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

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
