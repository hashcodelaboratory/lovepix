import React from 'react'

type IIcon = {
  width: number
  height: number
  color?: string
}

const Experience = ({ width, height, color }: IIcon) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height}>
      <defs>
        <clipPath id='b' transform='translate(-7.9)'>
          <path
            style={{
              fill: 'none',
              objectFit: 'contain',
            }}
            d='M0 0h50v50H0z'
          />
        </clipPath>
      </defs>
      <g data-name='Layer 2'>
        <g
          style={{
            clipPath: 'url(#b)',
          }}
          data-name='Layer 2'
        >
          <path
            d='M34.2 17.1A17.1 17.1 0 1 0 8.1 31.62V49a1 1 0 0 0 1.58.81l7.42-5.33 7.47 5.33a1 1 0 0 0 .58.19 1 1 0 0 0 .46-.11 1 1 0 0 0 .54-.89V31.62A17.08 17.08 0 0 0 34.2 17.1ZM17.68 42.44a1 1 0 0 0-1.16 0l-6.42 4.62V32.69a17.11 17.11 0 0 0 14.1 0v14.37Zm6.47-12a15.42 15.42 0 0 1-14.1 0 15.11 15.11 0 1 1 14.1 0Z'
            fill='#c31700'
          />
          <path
            d='M25.1 13.66 20.79 13l-1.91-3.84a2 2 0 0 0-3.56 0L13.41 13l-4.31.66A2 2 0 0 0 8.02 17l3.1 3-.73 4.27a2 2 0 0 0 .79 1.93 1.92 1.92 0 0 0 1.16.38 1.88 1.88 0 0 0 .92-.23l3.84-2 3.83 2a2 2 0 0 0 2.88-2.08l-.71-4.2 3.1-3a2 2 0 0 0-1.1-3.41ZM21.3 19a1 1 0 0 0-.28.89l.85 4.76-4.31-2.26a1 1 0 0 0-.92 0l-4.28 2.28.82-4.78a1 1 0 0 0-.28-.89l-3.49-3.36 4.8-.7a1 1 0 0 0 .76-.54L17.1 10l2.15 4.36a1 1 0 0 0 .76.54l4.79.67Z'
            fill='#c31700'
          />
        </g>
      </g>
    </svg>
  )
}

export default Experience
