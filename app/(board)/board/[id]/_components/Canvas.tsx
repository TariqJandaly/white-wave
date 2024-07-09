"use client"

import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"

import { useSelf } from "@/liveblocks.config"

interface CanvasProps {
  boardId: string
}

const Canvas: React.FC<CanvasProps> = ({ boardId }) => {

  const info = useSelf((me) => me.info)

  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none"
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  )
}

export default Canvas