'use client'

import { memo } from 'react'
import { MousePointer2 } from 'lucide-react'

import { getRandomColorFromId } from '@/lib/utils'
import { useOther } from '@/liveblocks.config'

interface CursorProps {
  id: number
}

const Cursor = memo(({ id }: CursorProps) => {

  const info = useOther(id, (user) => user.info)
  const cursor = useOther(id, (user) => user.presence.cursor)

  const name = info?.name || 'Teammate'

  if(!cursor) {
    return null
  }

  const { x, y } = cursor

  console.log(x, y)

  return (
    <foreignObject
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      height={50}
      width={name.length * 10 + 24}
      className='relative drop-shadow-md'
    >
      <MousePointer2
        className='h-5 w-5'
        style={{
          fill: getRandomColorFromId(id),
          color: getRandomColorFromId(id)
        }}
      />
      <div className='absolute select-none left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold'
        style={{
          backgroundColor: getRandomColorFromId(id)
        }}
      >
        { name }
      </div>
      
    </foreignObject>
  )
})

Cursor.displayName = 'Cursor'

export default Cursor