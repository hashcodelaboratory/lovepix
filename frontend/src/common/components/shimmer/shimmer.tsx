import { FC } from 'react'
import ItemSkeleton from '../../../screens-content/home/item-skeleton/item-skeleton'
import ReviewSkeleton from '../../../screens-content/home/review-skeleton/review-skeleton'

export enum SkeletonEnum {
  ITEM = 'ITEM',
  REVIEW = 'REVIEW',
}

type ShimmerProps = {
  count?: number
  skeleton?: SkeletonEnum
  isLoading?: boolean
  children?: JSX.Element | JSX.Element[]
}

const Shimmer: FC<ShimmerProps> = ({
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

  if (isLoading) {
    return (
      <div style={{ display: 'flex', overflow: 'auto' }}>
        {[...Array(count)].map((index) => getSkeletonComponent(index))}
      </div>
    )
  }

  return <>{children}</>
}

export default Shimmer
