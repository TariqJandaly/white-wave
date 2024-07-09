import { Eraser, Pencil, Redo, Shapes, Undo } from "lucide-react"

interface ToolbarProps {
  
}

const Toolbar: React.FC<ToolbarProps> = ({}) => {
  return (
    <main className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
      <div className="flex justify-between items-center gap-10 bg-white rounded-md px-5 h-12 shadow-md">
        <div>
          <Pencil />
        </div>
        <div>
          <Eraser />
        </div>
        <div>
          <Shapes />
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 bg-white rounded-md px-5 h-12 shadow-md">
        <div>
          <Undo />
        </div>
        <div>
          <Redo />
        </div>
      </div>
    </main>
  )
}

export default Toolbar