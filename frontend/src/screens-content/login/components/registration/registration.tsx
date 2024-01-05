import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from '../../login.module.scss'
import { Button, TextField } from '@mui/material'
import * as React from 'react'
import { getAuth } from 'firebase/auth'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

type RegistrationForm = {
  email: string
  password: string
}

type ControllerFieldType = {
  name: 'email' | 'password'
  error?: string
}

const DEFAULT_VALUES: RegistrationForm = {
  email: '',
  password: '',
}

const REGISTRATION_FORM_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required(),
})
const Registration = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<RegistrationForm>({
    resolver: yupResolver(REGISTRATION_FORM_SCHEMA),
    defaultValues: DEFAULT_VALUES,
  })

  const FIELDS: ControllerFieldType[] = [
    {
      name: 'email',
      error: errors.email?.message,
    },
    {
      name: 'password',
      error: errors.password?.message,
    },
  ]

  const inputs = FIELDS.map(({ name, error }) => (
    <div key={name} className={styles.input}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <TextField
              placeholder={t(name)}
              id={name}
              label={t(name)}
              {...field}
              {...register(name, { required: true })}
              error={!!error}
              helperText={String(error ?? '')}
              variant='outlined'
              size='small'
              fullWidth
              sx={{
                '& .MuiInput-root': {
                  '&:before, :after, :hover:not(.Mui-disabled):before': {
                    borderBottom: 0,
                  },
                },
              }}
              type={name}
            />
          </div>
        )}
      />
    </div>
  ))

  const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
    if (data) {
      const { email, password } = data
      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
        reset()
        await router.push('/')
      } catch (error: any) {
        const { code, message } = error
        console.log(code + message)
      }
    }
  }

  return (
    <div className={styles.registrationContainer}>
      <h2 className={styles.cardTitle}>Registrácia</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {inputs}
        <Button type='submit' className={styles.button}>
          Zaregistrovať sa
        </Button>
      </form>
    </div>
  )
}

export default Registration
