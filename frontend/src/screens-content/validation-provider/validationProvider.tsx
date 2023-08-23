import { createContext, useEffect, useState } from 'react'
import { ValidationDialog } from './validationDialog'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useRouter } from 'next/router'

export type ValidationContextType = {
  validateFunction: (
    title: string | ReactJSXElement,
    description: string | ReactJSXElement,
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
  const [dialogTitle, setDialogTitle] = useState<string | ReactJSXElement>('')
  const [dialogDescription, setDialogDescription] = useState<
    string | ReactJSXElement
  >('')
  const [defaultReturn, setDefaultReturn] = useState<boolean>(false)
  const [canDismiss, setCanDismiss] = useState<boolean>(false)
  const [callbackFunction, setCallbackFunction] = useState<
    () => (value: boolean) => void
  >(() => () => {})

  const router = useRouter()

  const validateFunction = (
    title: string | ReactJSXElement,
    description: string | ReactJSXElement,
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

  useEffect(() => {
    setDialogOpen(false)
  }, [router])

  return (
    <>
      <ValidationDialog
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
