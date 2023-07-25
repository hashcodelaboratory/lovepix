import * as yup from 'yup'

export const FORM_SCHEMA_REVIEW = yup
  .object({
    name: yup.string().required('Meno je povinné'),
    email: yup.string().required('Email je povinný'),
    review: yup.string().required('Prosím pridajte recenziu'),
  })
  .required()
