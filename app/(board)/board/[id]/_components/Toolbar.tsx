import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import ToolButton from "./ToolButton"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas"

interface ToolbarProps {
  canvasState: CanvasState
  setCanvasState: (newState: CanvasState) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const Toolbar: React.FC<ToolbarProps> = ({ canvasState, setCanvasState, undo, redo, canUndo, canRedo }) => {
  return (
    <main className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
      <div className="bg-white rounded-md p-1.5 flex gap-x-1 items-center shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layer: LayerType.Text
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layer === LayerType.Text
          }
        />
        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layer: LayerType.Note
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layer === LayerType.Note
          }
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layer: LayerType.Rectangle
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layer === LayerType.Rectangle
          }
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layer: LayerType.Ellipse
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layer === LayerType.Ellipse
          }
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => setCanvasState({
            mode: CanvasMode.Pencil,
          })}
          isActive={
            canvasState.mode === CanvasMode.Pencil
          }
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex gap-x-1 items-center shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </main>
  )
}

export default Toolbar