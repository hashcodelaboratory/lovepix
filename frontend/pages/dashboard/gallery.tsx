import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './dashboard.module.scss'
import UploadImagesTable from '../../src/screens-content/dashboard/components/content/components/gallery/upload-images-table'
import AdminAccess from 'common/protect-route'

const Gallery = () => {
  return (
    <AdminAccess>
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <UploadImagesTable />
      </div>
    </AdminAccess>
  )
}

export default Gallery

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
