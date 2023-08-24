import { createContext, useEffect, useState } from 'react'
import { ConfirmationDialog } from './confirmationDialog'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useRouter } from 'next/router'

export type ConfirmationDialogContextType = {
  confirmFunction: (
    title: string | ReactJSXElement,
    description: string | ReactJSXElement,
    callback: (value: boolean) => void,
    defaultReturn?: boolean,
    canDismiss?: boolean
  ) => void
}

export const ConfirmationDialogContext =
  createContext<ConfirmationDialogContextType>(
    {} as ConfirmationDialogContextType
  )

export const ConfirmationDialogProvider = ({
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

  const confirmFunction = (
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
      <ConfirmationDialog
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
      <ConfirmationDialogContext.Provider value={{ confirmFunction }}>
        {children}
      </ConfirmationDialogContext.Provider>
    </>
  )
}
