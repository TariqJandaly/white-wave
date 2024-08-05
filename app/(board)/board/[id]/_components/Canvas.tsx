"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"

import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage } from "@/liveblocks.config"
import { Camera, CanvasMode, CanvasState, Color, Layer, LayerType, Point } from "@/types/canvas"
import CursorsPresence from "./CursorsPresence"
import { pointerEventToCanvasPoint, getColorFromId } from "@/lib/utils"
import { nanoid } from 'nanoid'
import { LiveObject } from "@liveblocks/client"
import LayerPreview from "./LayerPreview"

const maxLayers = 100

interface CanvasProps {
  boardId: string
}

const Canvas: React.FC<CanvasProps> = ({ boardId }) => {

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({ r: 0, b: 0, g: 0 })

  const layerIds = useStorage(root => root.layerIds)

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [current, setCurrent] = useState<Camera>({ x: 0, y: 0 })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
    position: Point
  ) => {
    const liveLayers = storage.get('layers')

    if(liveLayers.size >= maxLayers) {
      return
    }

    const liveLayerIds = storage.get('layerIds')
    const layerId = nanoid()
    const layer = new LiveObject<Layer>({
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100,
      width: 100,
      fill: lastUsedColor
    })

    liveLayerIds.push(layerId)

    console.log(layerId)
    liveLayers.set(layerId, layer)

    setMyPresence({
      selection: [layerId]
    }, {
      addToHistory: true
    })

    setCanvasState({ mode: CanvasMode.None })

    
  }, [])

  const onWheel = useCallback((e: React.WheelEvent) => {

    if(e.shiftKey) {
      setCamera((camera) => {
        return {
          x: camera.x + e.deltaY,
          y: camera.y
        }
      })

      console.log(camera)

    } else {
      setCamera((camera) => {
        return {
          x: camera.x,
          y: camera.y - e.deltaY
        }
      })
    }

  }, [])

  var onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault()

    
    setCurrent(pointerEventToCanvasPoint(e, camera))

    setMyPresence({ cursor: { x: current.x, y: current.y } })
  }, [camera, current])  

  const onPointerLeave = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerUp = useMutation(({}, e: React.PointerEvent) => {
    const point = pointerEventToCanvasPoint(e, camera)

    if(canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layer, point)
    } else {
      setCanvasState({
        mode: CanvasMode.None
      })
    }

    history.resume()
  }, [ camera, canvasState, history, insertLayer ])

  
  const selections = useOthersMapped((other) => other.presence.selection)
  
  const onLayerPointerDown = useMutation(({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
    e.preventDefault()

    if( canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting ) {
      return
    }

    history.pause()
    e.stopPropagation()

    const point = pointerEventToCanvasPoint(e, camera)

    if(!self.presence.selection.includes(layerId)) {
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
    }

    setCanvasState({ mode: CanvasMode.Translating, current: point })

  }, [ canvasState, camera, history, canvasState.mode ])

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {}
    
    for(const user of selections) {
      const [connectionId, selection] = user

      for(const layerId of selection) {
        layerIdsToColorSelection[layerId] = getColorFromId(connectionId)
      }

    }

    return layerIdsToColorSelection

  }, [selections])

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
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`
          }}
        >
          { layerIds.map(layerId => {
            return <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          }) }
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}

export default Canvas