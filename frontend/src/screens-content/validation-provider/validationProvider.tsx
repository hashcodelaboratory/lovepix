import { createContext, useState } from 'react'
import { DeferredPromise } from 'common/types/deffered-promise'
import { ValidationPrompt, validationPromptProps } from './validationPrompt'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

export type ValidationContextType = {
  validateFunction: (
    title: string,
    description: string,
    defaultReturn?: boolean,
    canDismiss?: boolean,
    callback?: (value: boolean) => void
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
  const [promptProps, setPromptProps] = useState<validationPromptProps>({
    title: '',
    description: '',
    canDismiss: false,
    defaultReturn: true,
    callback: () => {},
  })

  const validateFunction = (
    title: string,
    description: string,
    defaultReturn: boolean = false,
    canDismiss: boolean = false,
    callback?: (value: boolean) => void
  ) => {
    const deffered = new DeferredPromise()
    const props = {
      description: description,
      title: title,
      canDismiss: canDismiss,
      defaultReturn: defaultReturn,
      callback: callback ?? deffered.resolve,
    }
    setPromptProps(props)
    setDialogOpen(true)
    return deffered.promise
  }

  return (
    <>
      <ValidationPrompt
        promptProps={promptProps}
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
