import { IconType } from '@icons/enums'
import { ICONS } from '@icons/icons'

export interface IconProps {
  icon: IconType
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const Icon = ({
  width,
  height,
  icon,
  className,
  style,
  onClick,
}: IconProps) => {
  const { viewBox, data, style: iconStyle } = ICONS[icon]

  // NOTE: currently not using iconStyle => always return data
  const svgContent =
    typeof data === 'string' ? <path d={data} style={iconStyle} /> : data

  return (
    <svg
      width={width || 200}
      height={height || 60}
      viewBox={viewBox || '0 0 50.38 63.49'}
      className={`examplekit__icon ${className}`}
      style={style}
      onClick={onClick}
    >
      {svgContent}
    </svg>
  )
}

export default Icon
