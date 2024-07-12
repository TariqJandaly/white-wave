"use client"

import { RoomProvider } from "@/liveblocks.config"
import { ClientSideSuspense } from "@liveblocks/react"
import React from "react"
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client"
import { Layer } from "@/types/canvas"

interface RoomProps {
  children: React.ReactNode
  roomId: string,
  fallback: React.ReactNode
}

const Room: React.FC<RoomProps> = ({ children, roomId, fallback }) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: []
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList([])
      }}
    >
      <ClientSideSuspense fallback={fallback} >
        { children }
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default Room