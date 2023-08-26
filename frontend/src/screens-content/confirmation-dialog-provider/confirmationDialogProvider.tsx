import { createContext, useEffect, useState } from 'react'
import { ConfirmationDialog } from './confirmationDialog'
import { useRouter } from 'next/router'

export type ConfirmationDialogContextType = {
  confirmFunction: (
    title: string | JSX.Element,
    description: string | JSX.Element,
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
  children: JSX.Element
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<string | JSX.Element>('')
  const [dialogDescription, setDialogDescription] = useState<
    string | JSX.Element
  >('')
  const [defaultReturn, setDefaultReturn] = useState<boolean>(false)
  const [canDismiss, setCanDismiss] = useState<boolean>(false)
  const [callbackFunction, setCallbackFunction] = useState<
    () => (value: boolean) => void
  >(() => () => {})

  const router = useRouter()

  const confirmFunction = (
    title: string | JSX.Element,
    description: string | JSX.Element,
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
      <ConfirmationDialogContext.Provider value={{ confirmFunction }}>
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
        >
          {children}
        </ConfirmationDialog>
      </ConfirmationDialogContext.Provider>
    </>
  )
}
