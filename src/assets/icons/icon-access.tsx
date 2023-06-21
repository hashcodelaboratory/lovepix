import React from 'react'

type IIcon = {
  width: number
  height: number
  color?: string
}

const Access = ({ width, height }: IIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 600 600'
    >
      <defs>
        <clipPath id='a'>
          <path d='M85.145 144.98h429.75v309.75H85.145Zm0 0' />
        </clipPath>
        <clipPath id='b'>
          <path d='M151 412h43v42.73h-43Zm0 0' />
        </clipPath>
        <clipPath id='c'>
          <path d='M202 412h43v42.73h-43Zm0 0' />
        </clipPath>
        <clipPath id='d'>
          <path d='M253 412h43v42.73h-43Zm0 0' />
        </clipPath>
        <clipPath id='e'>
          <path d='M304 412h43v42.73h-43Zm0 0' />
        </clipPath>
        <clipPath id='f'>
          <path d='M355 412h43v42.73h-43Zm0 0' />
        </clipPath>
        <clipPath id='g'>
          <path d='M406 412h43v42.73h-43Zm0 0' />
        </clipPath>
      </defs>
      <g clipPath='url(#a)'>
        <path
          fill='#e61b40'
          d='M340.203 216.625h-17.992v-14.023h17.992Zm0 16.387h-17.992v-13.13h17.992Zm-21.25-16.387h-17.289v-14.023h17.29Zm0 16.387h-17.289v-13.13h17.29Zm-20.547-16.387h-17.285v-14.023h17.285Zm0 16.387h-17.285v-13.13h17.285Zm-20.55-16.387h-18.102v-14.023h18.101Zm0 16.387h-18.102v-13.13h18.101Zm22.18-88.032L85.206 249.172V454.73h56.316V254.023h317.02V454.73h56.32V249.172L300.035 144.98'
        />
      </g>
      <path
        fill='#e61b40'
        d='M151.578 304.2h42.07v-42.024h-42.07v42.023M202.547 304.2h42.07v-42.024h-42.07v42.023M151.578 354.379h42.07v-42.027h-42.07v42.027M202.547 354.379h42.07v-42.027h-42.07v42.027M253.516 354.379h42.066v-42.027h-42.066v42.027M151.578 404.555h42.07v-42.028h-42.07v42.028M202.547 404.555h42.07v-42.028h-42.07v42.028M253.516 404.555h42.066v-42.028h-42.066v42.028M304.484 404.555h42.07v-42.028h-42.07v42.028'
      />
      <g clipPath='url(#b)'>
        <path fill='#e61b40' d='M151.578 454.73h42.07v-42.023h-42.07v42.023' />
      </g>
      <g clipPath='url(#c)'>
        <path fill='#e61b40' d='M202.547 454.73h42.07v-42.023h-42.07v42.023' />
      </g>
      <g clipPath='url(#d)'>
        <path
          fill='#e61b40'
          d='M253.516 454.73h42.066v-42.023h-42.066v42.023'
        />
      </g>
      <g clipPath='url(#e)'>
        <path fill='#e61b40' d='M304.484 454.73h42.07v-42.023h-42.07v42.023' />
      </g>
      <g clipPath='url(#f)'>
        <path fill='#e61b40' d='M355.453 454.73h42.07v-42.023h-42.07v42.023' />
      </g>
      <g clipPath='url(#g)'>
        <path fill='#e61b40' d='M406.418 412.707v42.023h42.07v-42.023h-42.07' />
      </g>
    </svg>
  )
}

export default Access
