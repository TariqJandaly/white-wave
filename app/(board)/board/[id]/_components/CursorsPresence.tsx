'use client'

import { memo } from "react"

import { useOthersConnectionIds } from "@/liveblocks.config"
import Cursor from "./Cursor"

const Cursors = () => {
  const ids = useOthersConnectionIds()

  return (
    <>
      { ids.map(connectionId => {
        return <Cursor
          key={connectionId}
          id={connectionId}
        />
      }) }
    </>
  )
}

interface CursorsPresenceProps {
  
}

const CursorsPresence = memo(({  }: CursorsPresenceProps) => {
  return (
    <>
      {/* Draft pencil */}
      <Cursors />
    </>
  )
})

CursorsPresence.displayName = 'CursorsPresence'

export default CursorsPresence