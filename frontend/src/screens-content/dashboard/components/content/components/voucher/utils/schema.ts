import * as yup from 'yup'

export const FORM_SCHEMA = yup
  .object({
    code: yup.string().required('codeValidation'),
    description: yup.string().required('descriptionValidation'),
    saleType: yup.string().required('saleTypeValidation'),
    // value: yup.string().required('valueValidation'),
    // freeDelivery: yup.string().required('freeDeliveryValidation'),
    // expiration: yup.string().required('expirationValidation'),
    // minimalValue: yup.string().notRequired(),
    // limit: yup.string().notRequired(),
    // limitUser: yup.string().notRequired(),
  })
  .required()
