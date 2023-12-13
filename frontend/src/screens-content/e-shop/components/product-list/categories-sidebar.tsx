import { useCategoriesEshop } from 'common/api/use-categories-eshop'
import { useRouter } from 'next/router'
import styles from './product-list.module.scss'
import React from 'react'
import { Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { localizationKey } from 'localization/localization-key'
import { Route } from 'common/enums/routes'

const CategoriesSidebar = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { kategoria } = router.query
  const { data: categories, isLoading } = useCategoriesEshop()

  const selectCategory = (category: string) => () =>
    router.push({
      pathname: Route.ESHOP,
      query: { kategoria: category },
    })

  const categoriesList = categories?.map((item, index) => (
    <div
      key={item.id}
      onClick={selectCategory(item.name)}
      className={
        kategoria === item.name ? styles.categoryActive : styles.categoryItem
      }
    >
      {item.name}
    </div>
  ))

  const showAllProducts = () => router.push(Route.ESHOP)

  const categoryStyle = !!kategoria
    ? styles.categoryItem
    : styles.categoryActive

  const shimmers = [...Array(5)].map((index: number) => (
    <Skeleton key={index} animation='wave' width='100%' height={20} />
  ))

  return (
    <div className={styles.categoriesContainer}>
      <Typography variant='h6' className={styles.categoryTitle}>
        {t(localizationKey.categories)}
      </Typography>
      <div onClick={showAllProducts} className={categoryStyle}>
        {t(localizationKey.allProducts)}
      </div>
      {isLoading ? shimmers : categoriesList}
    </div>
  )
}

export default CategoriesSidebar
