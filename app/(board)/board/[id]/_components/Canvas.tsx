"use client"

import { useCallback, useState } from "react"
import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"

import { useCanRedo, useCanUndo, useHistory, useMutation } from "@/liveblocks.config"
import { Camera, CanvasMode, CanvasState } from "@/types/canvas"
import CursorsPresence from "./CursorsPresence"
import { pointerEventToCanvasPoint } from "@/lib/utils"

interface CanvasProps {
  boardId: string
}

const Canvas: React.FC<CanvasProps> = ({ boardId }) => {

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY
    }))
  }, [])

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault()

    
    const current = pointerEventToCanvasPoint(e, camera)

    setMyPresence({ cursor: current })
  }, [])

  const onPointerLeave = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    setMyPresence({ cursor: null })
  }, [])

  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none"
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={history.redo}
        undo={history.undo}
      />
      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}

export default Canvas