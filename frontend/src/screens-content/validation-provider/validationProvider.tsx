import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { createContext, useState } from 'react'
import { DeferredPromise } from 'common/types/deffered-promise'

export type ValidationContextType = {
  validateFunction: (
    title: string,
    description: string,
    defaultReturn?: boolean,
    clickAway?: boolean
  ) => void
}

export const ValidationContext = createContext<ValidationContextType>(
  {} as ValidationContextType
)

type ValidationPropsType = {
  promise: DeferredPromise
  title: string
  description: string
  defaultReturn: boolean
  clickAway: boolean
}

export const ValidationProvider = ({ children }: { children: any }) => {
  const defaultPromise = new DeferredPromise()
  const defaultValues = {
    title: 'Are you sure?',
    description: 'Are you sure?',
    promise: defaultPromise,
    clickAway: false,
    defaultReturn: false,
  }

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [validationProps, setValidationProps] =
    useState<ValidationPropsType>(defaultValues)

  const handleClose = (value: unknown) => {
    setDialogOpen(false)
    validationProps.promise.resolve(value)
  }

  const validateFunction = (
    title: string,
    description: string,
    defaultReturn: boolean = false,
    clickAway: boolean = false
  ) => {
    const deffered = new DeferredPromise()
    const props = {
      promise: deffered,
      description: description,
      title: title,
      clickAway: clickAway,
      defaultReturn: defaultReturn,
    }
    setValidationProps(props)
    setDialogOpen(true)
    return deffered.promise
  }

  const btnInfo = [
    { value: false, name: 'DISAGREE' },
    { value: true, name: 'AGREE' },
  ]

  return (
    <>
      <Dialog
        open={dialogOpen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={
          validationProps.clickAway
            ? () => handleClose(validationProps.defaultReturn)
            : undefined
        }
      >
        <DialogTitle id='alert-dialog-title'>
          {validationProps.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {validationProps.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {btnInfo.map((item) => (
            <Button
              onClick={() => {
                handleClose(item.value)
              }}
              variant={
                validationProps.defaultReturn === item.value
                  ? 'contained'
                  : 'outlined'
              }
            >
              {item.name}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
      <ValidationContext.Provider
        value={{ validateFunction: validateFunction }}
      >
        {children}
      </ValidationContext.Provider>
    </>
  )
}
