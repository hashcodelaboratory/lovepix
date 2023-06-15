import React from 'react'

type IIcon = {
  width: number
  height: number
  color?: string
}

const Access = ({ width, height, color }: IIcon) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height}>
      <defs>
        <clipPath id='c' transform='translate(-6.86)'>
          <path
            style={{
              fill: 'none',
            }}
            d='M0 0h50v50H0z'
            fill='#c31700'
          />
        </clipPath>
      </defs>
      <g data-name='Layer 3'>
        <g
          style={{
            clipPath: 'url(#a)',
          }}
          data-name='Layer 3'
        >
          <path
            d='M18.14 19.14a9.57 9.57 0 1 0-9.57-9.57 9.58 9.58 0 0 0 9.57 9.57Zm0-17.14a7.57 7.57 0 1 1-7.57 7.57A7.58 7.58 0 0 1 18.14 2ZM34.14 44.71a2.14 2.14 0 0 0 2.14-2.14v-7.13a13.74 13.74 0 0 0-13.72-13.73h-8.84A13.74 13.74 0 0 0 0 35.44v7.13a2.14 2.14 0 0 0 2.14 2.14h4.09L6.7 48H1a1 1 0 1 0 0 2h34.28a1 1 0 0 0 0-2h-5.7l.47-3.29Zm-32-2a.14.14 0 0 1-.14-.14v-7.13a11.74 11.74 0 0 1 11.72-11.73h3.42v4.72a1 1 0 0 0 2 0v-4.72h3.42a11.74 11.74 0 0 1 11.72 11.73v7.13a.14.14 0 0 1-.14.14h-3.81l1.19-8.26a2.17 2.17 0 0 0-.51-1.71 2.12 2.12 0 0 0-1.62-.74H6.89a2.12 2.12 0 0 0-1.62.74 2.17 2.17 0 0 0-.51 1.71l1.19 8.26ZM8.72 48l-2-13.84a.11.11 0 0 1 0-.11.14.14 0 0 1 .11 0h22.5a.14.14 0 0 1 .11 0 .11.11 0 0 1 0 .11L27.56 48Z'
            fill='#c31700'
          />
          <circle cx={18.14} cy={41} r={2.29} fill='#c31700' />
        </g>
      </g>
    </svg>
  )
}

export default Access
