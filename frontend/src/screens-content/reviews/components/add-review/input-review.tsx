import React from 'react'
import { Controller, UseFormRegister } from 'react-hook-form'
import { FormReview } from './add-review'
import { TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'

type InputProps = {
  name: 'name' | 'email' | 'review'
  label: string
  register: UseFormRegister<FormReview>
  control: any
  errors: any
  placeholder: string
  multiline?: boolean
}

const InputReview = ({
  name,
  label,
  register,
  control,
  errors,
  placeholder,
  multiline,
}: InputProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <TextField
              placeholder={t(placeholder)}
              id={name}
              label={t(label)}
              fullWidth
              multiline={multiline}
              rows={4}
              {...field}
              {...register(name, { required: true })}
              error={!!errors.review?.message}
              helperText={String(errors.review?.message ?? '')}
              variant='outlined'
              size='small'
              sx={{
                marginBottom: '10px',
                backgroundColor: 'white',
                '& .MuiInput-root': {
                  '&:before, :after, :hover:not(.Mui-disabled):before': {
                    borderBottom: 0,
                  },
                },
              }}
            />
          </div>
        )}
      />
    </div>
  )
}

export default InputReview
