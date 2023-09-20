import { useGetEditableContent } from './get-editable-content'
import { useEffect, useState } from 'react'
import { useIsAdmin } from '../auth/use-is-admin'
import { EditablePage } from '../editable-pages/editable-page'
import { usePostEditableContent } from './post-editable-content'
import { Content } from './content'

export const useEditableContent = (identifier: EditablePage) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [value, setValue] = useState<string | undefined>(undefined)
  const [content, setContent] = useState<Content | undefined>(undefined)

  const isAdmin = useIsAdmin()

  const { mutate: getContent } = useGetEditableContent({
    onSuccess: async (res) => {
      const data = await res.json()

      setValue(data.content)
      setContent(data)
    },
  })

  const { mutate: postContent } = usePostEditableContent()

  useEffect(() => {
    getContent({ id: identifier })
  }, [])

  const enableEditMode = () => setEditMode(true)

  const disableEditMode = () => setEditMode(false)

  const canSaveChanges = isAdmin && editMode

  const save = () => {
    if (!content) {
      return
    }

    const { id } = content

    if (!id) {
      return
    }

    postContent({
      id,
      content: value ?? '',
    })
  }

  return {
    value,
    setValue,
    canSaveChanges,
    isAdmin,
    enableEditMode,
    disableEditMode,
    editMode,
    save,
  }
}
