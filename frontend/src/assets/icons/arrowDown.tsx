import * as React from 'react'

type IIcon = {
   width: number
   height: number
   color?: string
 }

const ArrowDown = ({width, height, color}: IIcon) => {
   return (
      <svg
   width={width}
   height={height}
   viewBox="0 0 43.84042 21.553837"
   xmlns="http://www.w3.org/2000/svg"
   >
  <g
     transform="translate(-52.329786,-122.20993)">
    <path
       fill="none"
       stroke={color ?? "black"}
       strokeWidth="5.85208"
       d="M 95.536923,122.88558 74.249997,142.83777 52.96307,122.88558" />
      </g>
   </svg>
   )
}

export default ArrowDown