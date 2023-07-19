import { useCategoriesEshop } from 'common/api/use-categories-eshop'
import { useRouter } from 'next/router'
import styles from './product-list.module.scss'
import React from 'react'
import { Skeleton, Typography } from '@mui/material'
import { messages } from 'messages/messages'
import { ESHOP } from 'constants/pages/urls'
import { useTranslation } from 'next-i18next'

const CategoriesSidebar = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { kategoria } = router.query
  const { data: categories, isFetching } = useCategoriesEshop()

  const selectCategory = (category: string) => () =>
    router.push({
      pathname: '/e-shop',
      query: { kategoria: category },
    })

  const categoriesList = categories?.map((item, index) => (
    <div
      key={index}
      onClick={selectCategory(item.name)}
      className={
        kategoria === item.name ? styles.categoryActive : styles.categoryItem
      }
    >
      {item.name}
    </div>
  ))

  const showAllProducts = () => router.push(ESHOP)

  const categoryStyle = !!kategoria
    ? styles.categoryItem
    : styles.categoryActive

  const shimmers = [...Array(5)].map((index: number) => (
    <Skeleton key={index} animation='wave' width='100%' height={20} />
  ))

  return (
    <div className={styles.categoriesContainer}>
      <Typography variant='h5' className={styles.categoryTitle}>
        {t(messages.categories)}
      </Typography>
      <div onClick={showAllProducts} className={categoryStyle}>
        {t(messages.allProducts)}
      </div>
      {isFetching ? shimmers : categoriesList}
    </div>
  )
}

export default CategoriesSidebar
