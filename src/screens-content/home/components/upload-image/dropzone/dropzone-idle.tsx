import styles from '../../../home.module.scss'
import { useTranslation } from 'next-i18next'
import { messages } from '../../../../../messages/messages'

const DropzoneIdle = () => {
  const { t } = useTranslation()

  const { uploadPhoto, uploadPhotoSubcontent } = messages

  return (
    <div style={{ textAlign: 'center' }}>
      <button className={styles.uploadButton}>{String(t(uploadPhoto))}</button>
      <p className={styles.uploadPhotoSubcontent}>
        {String(t(uploadPhotoSubcontent))}
      </p>
    </div>
  )
}

export default DropzoneIdle
