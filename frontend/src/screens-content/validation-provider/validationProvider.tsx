import { createContext, useState } from 'react'
import { ValidationPrompt, validationPromptProps } from './validationPrompt'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

export type ValidationContextType = {
  validateFunction: (
    title: string,
    description: string,
    callback: (value: boolean) => void,
    defaultReturn?: boolean,
    canDismiss?: boolean
  ) => void
}

export const ValidationContext = createContext<ValidationContextType>(
  {} as ValidationContextType
)

export const ValidationProvider = ({
  children,
}: {
  children: ReactJSXElement | ReactJSXElement[]
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<string>('')
  const [dialogDescription, setDialogDescription] = useState<string>('')
  const [defaultReturn, setDefaultReturn] = useState<boolean>(false)
  const [canDismiss, setCanDismiss] = useState<boolean>(false)
  const [callbackFunction, setCallbackFunction] = useState<
    () => (value: boolean) => void
  >(() => () => {})

  const validateFunction = (
    title: string,
    description: string,
    callback: (value: boolean) => void,
    defaultReturn: boolean = false,
    canDismiss: boolean = false
  ) => {
    setDialogDescription(description)
    setDialogTitle(title)
    setCallbackFunction(() => callback)
    setCanDismiss(canDismiss)
    setDefaultReturn(defaultReturn)
    setDialogOpen(true)
  }

  return (
    <>
      <ValidationPrompt
        title={dialogTitle}
        description={dialogDescription}
        defaultReturn={defaultReturn}
        canDismiss={canDismiss}
        callback={callbackFunction}
        open={dialogOpen}
        closeDialog={() => {
          setDialogOpen(false)
        }}
      />
      <ValidationContext.Provider value={{ validateFunction }}>
        {children}
      </ValidationContext.Provider>
    </>
  )
}
