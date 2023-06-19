import * as yup from 'yup'

export const FORM_SCHEMA = yup
  .object({
    title: yup.string().required('titleValidation'),
    price: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required('priceValidation'),
    description: yup.string().required('descriptionValidation'),
    count: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required('countValidation'),
  })
  .required()
