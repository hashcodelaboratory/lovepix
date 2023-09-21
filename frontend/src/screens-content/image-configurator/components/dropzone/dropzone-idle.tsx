import styles from '../../image-configurator-layout.module.scss'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../localization/localization-key'

const DropzoneIdle = () => {
  const { t } = useTranslation()

  const { uploadPhoto, uploadPhotoSubcontent } = localizationKey

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
