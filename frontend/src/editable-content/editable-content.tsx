import { EditablePage } from '../editable-pages/editable-page'
import { Markdown } from './markdown'
import Button from '@mui/material/Button'
import { localizationKey } from '../localization/localization-key'
import { useTranslation } from 'next-i18next'
import { Grid } from '@mui/material'
import { useEditableContent } from './use-editable-content'

type EditablePageProps = {
  identifier: EditablePage
}

export const EditableContent = ({ identifier }: EditablePageProps) => {
  const { t } = useTranslation()
  const {
    isAdmin,
    editMode,
    disableEditMode,
    enableEditMode,
    value,
    setValue,
    canSaveChanges,
    save,
  } = useEditableContent(identifier)

  return (
    <>
      {isAdmin && (
        <Grid container mb={2} justifyContent='flex-end' spacing={2}>
          {editMode && (
            <Grid item>
              <Button onClick={disableEditMode} variant='contained'>
                {t(localizationKey.preview)}
              </Button>
            </Grid>
          )}
          {!editMode && (
            <Grid item>
              <Button onClick={enableEditMode} variant='contained'>
                {t(localizationKey.edit)}
              </Button>
            </Grid>
          )}
        </Grid>
      )}
      <Markdown editMode={editMode} value={value} onValueChange={setValue} />
      {canSaveChanges && (
        <Grid container mt={2} justifyContent='flex-end' spacing={2}>
          <Grid item>
            <Button variant='contained' onClick={save}>
              {t(localizationKey.saveChanges)}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  )
}
