import React from 'react'

type IIcon = {
  width: number
  height: number
  color?: string
}

const Delivery = ({ width, height, color }: IIcon) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height}>
      <defs>
        <clipPath id='a' transform='translate(0 -4.57)'>
          <path
            style={{
              fill: 'none',
            }}
            d='M0 0h50v50H0z'
            fill='#c31700'
          />
        </clipPath>
      </defs>
      <g data-name='Layer 1'>
        <g
          style={{
            clipPath: 'url(#a)',
          }}
          data-name='Layer 1'
        >
          <path
            d='M22.71 17.14H17a1 1 0 0 0 0 2h5.71a1 1 0 0 0 0-2ZM20.43 21.72h-5.72a1 1 0 0 0 0 2h5.72a1 1 0 0 0 0-2Z'
            fill='#c31700'
          />
          <path
            d='M49.8 21.12v-.49h-.14a5.9 5.9 0 0 0-.78-1.49l-6.79-9.28-2-2.74a5.84 5.84 0 0 0-4.68-2.37h-7.12V2.2a2.21 2.21 0 0 0-2.2-2.2H2.14A2.14 2.14 0 0 0 0 2.14v32a2.14 2.14 0 0 0 2.14 2.15H6.9a5 5 0 0 0 9.91 0h16.38a5 5 0 0 0 9.91 0h4.76A2.14 2.14 0 0 0 50 34.14V22.57a5.83 5.83 0 0 0-.2-1.45Zm-2.35-.49H34.74c-.05 0-.2-.15-.2-.41v-8c0-.26.15-.41.2-.41h6.31l6.22 8.5a3 3 0 0 1 .18.32ZM35.38 6.72a3.83 3.83 0 0 1 3.07 1.55l1.13 1.56h-4.84a2.31 2.31 0 0 0-2.2 2.41v8a2.31 2.31 0 0 0 2.2 2.41H48v3.66H28.29V6.72ZM11.14 2h6v8.68L14.65 9.2a1 1 0 0 0-1 0l-2.49 1.48ZM2 2.14A.14.14 0 0 1 2.14 2h7v10.43a1 1 0 0 0 1.51.86l3.49-2.07 3.49 2.07a1.06 1.06 0 0 0 .51.14 1 1 0 0 0 1-1V2h7a.2.2 0 0 1 .2.2v24.09H2Zm9.86 36.72a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm26.28 0a3 3 0 1 1 3-3 3 3 0 0 1-3 3ZM48 34.14a.15.15 0 0 1-.14.15h-5a5 5 0 0 0-9.45 0H16.58a5 5 0 0 0-9.45 0h-5a.15.15 0 0 1-.13-.15v-5.85h46Z'
            fill='#c31700'
          />
        </g>
      </g>
    </svg>
  )
}

export default Delivery
