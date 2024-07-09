"use client"

import { RoomProvider } from "@/liveblocks.config"
import { ClientSideSuspense } from "@liveblocks/react"
import React from "react"
import Loading from "./auth/Loading"

interface RoomProps {
  children: React.ReactNode
  roomId: string,
  fallback: React.ReactNode
}

const Room: React.FC<RoomProps> = ({ children, roomId, fallback }) => {
  return (
    <RoomProvider id={roomId} initialPresence={{

    }}>
      <ClientSideSuspense fallback={fallback} >
        { children }
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default Room