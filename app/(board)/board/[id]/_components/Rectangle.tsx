import { colorToCss } from "@/lib/utils"
import { RectangleLayer } from "@/types/canvas"

interface RectangleProps {
  id: string
  layer: RectangleLayer
  onPointerDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor?: string
}

const Rectangle: React.FC<RectangleProps> = ({ id, layer, onPointerDown, selectionColor }) => {

  const { x, y, width, height, fill } = layer

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={colorToCss(fill) || '#222'}
      stroke={selectionColor || "transparent"}
    />
  )
}

export default Rectangle