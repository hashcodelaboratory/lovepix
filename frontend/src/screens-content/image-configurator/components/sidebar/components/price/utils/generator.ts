import { Material } from '../../../../../../../common/enums/material'
import {
  CANVAS_PRICES_BY_HEIGHT,
  CANVAS_PRICES_BY_WIDTH,
  CANVAS_PRICES_SQUARE,
} from '../../../../../../../common/configuration/price/canvas'
import {
  AKRYL_PRICES_BY_HEIGHT,
  AKRYL_PRICES_BY_WIDTH,
  AKRYL_PRICES_SQUARE,
} from '../../../../../../../common/configuration/price/akryl'
import {
  DIBOND_PRICES_BY_HEIGHT,
  DIBOND_PRICES_BY_WIDTH,
  DIBOND_PRICES_SQUARE,
} from '../../../../../../../common/configuration/price/dibond'

export const getPrice = (
  width: number,
  height: number,
  material?: Material
) => {
  switch (material) {
    case Material.ACRYLIC:
      return getAkrylPrice(width, height)
    case Material.CANVAS:
      return getCanvasPrice(width, height)
    case Material.DIBOND:
      return getDibondPrice(width, height)
    case Material.POSTER:
      return getPosterPrice(width, height)
    case Material.FOAM:
      return getPosterPrice(width, height)
    default:
      return '-'
  }
}

const getAkrylPrice = (width: number, height: number) => {
  if (width > height) {
    return (
      AKRYL_PRICES_BY_WIDTH.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  } else if (width === height) {
    return (
      AKRYL_PRICES_SQUARE.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  } else {
    return (
      AKRYL_PRICES_BY_HEIGHT.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  }
}

const getCanvasPrice = (width: number, height: number) => {
  if (width > height) {
    return (
      CANVAS_PRICES_BY_WIDTH.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  } else if (width === height) {
    return (
      CANVAS_PRICES_SQUARE.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  } else {
    return (
      CANVAS_PRICES_BY_HEIGHT.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  }
}

const getDibondPrice = (width: number, height: number) => {
  if (width > height) {
    return (
      DIBOND_PRICES_BY_WIDTH.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  } else if (width === height) {
    return (
      DIBOND_PRICES_SQUARE.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  } else {
    return (
      DIBOND_PRICES_BY_HEIGHT.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  }
}

// TODO: update in future with prices
const getPosterPrice = (width: number, height: number) => {
  if (width > height) {
    return (
      CANVAS_PRICES_BY_WIDTH.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  } else if (width === height) {
    return (
      CANVAS_PRICES_SQUARE.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  } else {
    return (
      CANVAS_PRICES_BY_HEIGHT.find(
        (item) => item.width === width && item.height === height
      )?.price ?? '-'
    )
  }
}
