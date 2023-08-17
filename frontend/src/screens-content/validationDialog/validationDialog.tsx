import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { createContext, useEffect, useState } from 'react'
import { CONFIGURATION_TABLE_KEY } from '../../common/indexed-db/hooks/keys'
import { configurationsTable } from '../../../database.config'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

type ValidationContextType = {
  validateFunction: (
    isValidFunction: () => boolean,
    responseFunc: (isTrue: boolean) => void,
    question: string
  ) => void
}

export const ValidationContext = createContext<ValidationContextType>(
  {} as ValidationContextType
)

type ValidationPropsType = {
  response: (isTrue: boolean) => void
  dialogTitle: string
  dialogQuestion: string
}

export const ValidationDialog = ({
  children,
}: {
  children: ReactJSXElement[] | ReactJSXElement
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [validationProps, setValidationProps] = useState<ValidationPropsType>({
    response: (isTrue: boolean) => {},
    dialogTitle: 'Are you sure',
    dialogQuestion: 'Are you sure',
  })

  const handleClose = () => setDialogOpen(false)

  const validateFunction = (
    isValidFunction: () => boolean,
    responseFunc: (isTrue: boolean) => void,
    question: string,
    askDialog: boolean = true,
    title?: string
  ) => {
    console.log(isValidFunction())
    if (isValidFunction()) {
      responseFunc(true)
      return
    }
    if (!askDialog) {
      responseFunc(false)
      return
    }

    const props = {
      response: responseFunc,
      dialogQuestion: question,
      dialogTitle: title ?? validationProps.dialogTitle,
    }
    setValidationProps(props)
    setDialogOpen(true)
  }

  return (
    <>
      <Dialog
        open={dialogOpen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {validationProps.dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {validationProps.dialogQuestion}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
              validationProps.response(false)
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              handleClose()
              validationProps.response(true)
            }}
            autoFocus
          >
            Agree
          </Button>
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
