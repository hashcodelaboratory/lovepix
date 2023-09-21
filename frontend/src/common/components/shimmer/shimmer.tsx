import { FC } from 'react'
import ItemSkeleton from '../../../screens-content/home/item-skeleton/item-skeleton'
import ReviewSkeleton from '../../../screens-content/home/review-skeleton/review-skeleton'
import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import styles from '../../../screens-content/home/home.module.scss'

export enum SkeletonEnum {
  ITEM = 'ITEM',
  REVIEW = 'REVIEW',
}

type ShimmerProps = {
  duration?: number
  animate?: boolean
  withoutScrollbar?: boolean
  count?: number
  skeleton?: SkeletonEnum
  isLoading?: boolean
  children?: JSX.Element | JSX.Element[]
}

const WithoutScrollBarContainer = styled(Box)({
  display: 'flex',
  overflow: 'visible',
  padding: 10,
})

const ScrollBarContainer = styled('div')({
  display: 'flex',
  overflow: 'auto',
  padding: 10,
})

const Shimmer: FC<ShimmerProps> = ({
  duration = 0,
  animate = false,
  withoutScrollbar = false,
  count = 4,
  skeleton = SkeletonEnum.ITEM,
  isLoading = true,
  children,
}) => {
  const getSkeletonComponent = (key: number) => {
    switch (skeleton) {
      case SkeletonEnum.ITEM:
        return <ItemSkeleton key={key} />
      case SkeletonEnum.REVIEW:
        return <ReviewSkeleton key={key} />
    }
  }

  const Container = withoutScrollbar
    ? WithoutScrollBarContainer
    : ScrollBarContainer

  if (isLoading) {
    const items = [...Array(count)].map((index) => getSkeletonComponent(index))

    return <Container>{items}</Container>
  }

  if (!animate) {
    return <Container>{children}</Container>
  }

  return (
    <Container className={styles.animatedRow}>
      <div
        className={styles.loopSlider}
        style={{
          // @ts-ignore
          '--duration': `${duration}ms`,
          '--direction': 'normal',
        }}
      >
        <div className={styles.inner}>
          {children}
          {children}
        </div>
      </div>
      {animate && <div className={styles.fade} />}
    </Container>
  )
}

export default Shimmer
