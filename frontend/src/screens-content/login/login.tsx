import styles from './login.module.scss'
import LogoComponent from '../../app-bar/components/menu-sidebar/logo/logo'
import * as React from 'react'
import { useRouter } from 'next/router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { logIn } from '../../auth'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import Registration from './components/registration/registration'

type LoginForm = {
  email: string
  password: string
}

type ControllerFieldType = {
  name: 'email' | 'password'
  error?: string
}

const DEFAULT_VALUES: LoginForm = {
  email: '',
  password: '',
}

const LOGIN_FORM_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required(),
})

const LoginLayout = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<LoginForm>({
    resolver: yupResolver(LOGIN_FORM_SCHEMA),
    defaultValues: DEFAULT_VALUES,
  })

  const [isNewRegistrationEnabled, setIsNewRegistrationEnabled] =
    useState(false)

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

  const navigate = () => {
    router.push('/')
  }

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    if (data) {
      const { email, password } = data
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
        await router.push('/')
        reset()
      } catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode + errorMessage)
      }
    }
  }

  const googleLogin = async () => {
    await logIn()
    await router.push('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <LogoComponent navigate={navigate} />
        <p className={styles.headerTitle}>Lovepix.sk</p>
      </div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Prihlásenie</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {inputs}
          <Button type='submit' className={styles.button}>
            Pokračovať
          </Button>
        </form>
        <div>
          <p
            className={styles.cardText}
            style={{ color: 'gray', marginBottom: 8 }}
          >
            Prihlásiť cez:
          </p>
          <div className={styles.rowCenter}>
            <Button className={styles.googleButton} onClick={googleLogin} />
          </div>
          <div>
            {isNewRegistrationEnabled ? (
              <>
                <Registration />
                <p
                  onClick={() => {
                    setIsNewRegistrationEnabled(false)
                  }}
                  className={styles.registration}
                >
                  Zrušiť registráciu
                </p>
              </>
            ) : (
              <p
                onClick={() => {
                  setIsNewRegistrationEnabled(true)
                }}
                className={styles.registration}
              >
                Nová registrácia
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginLayout
