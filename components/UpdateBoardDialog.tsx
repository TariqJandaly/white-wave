'use client'

import Hint from "@/components/Hint"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/useApiMutation"
import { cn } from "@/lib/utils"
import { useOrganization } from "@clerk/nextjs"
import { useState } from "react"
import { toast } from "sonner"

interface UpdateBoardProps {
  isOpen: boolean,
  id: string
  _title: string,
  _color: string
  setIsOpen: any
}

const colors = [
    {
        "name": "Electric Blue",
        "hex": "#7DF9FF"
    },
    {
        "name": "Neon Green",
        "hex": "#39FF14"
    },
    {
        "name": "Hot Pink",
        "hex": "#FF69B4"
    },
    {
        "name": "Electric Lime",
        "hex": "#CCFF00"
    },
    {
        "name": "Vivid Orange",
        "hex": "#FF5F1F"
    },
    {
        "name": "Bright Turquoise",
        "hex": "#08E8DE"
    },
    {
        "name": "Shocking Yellow",
        "hex": "#FFD300"
    },
    {
        "name": "Electric Purple",
        "hex": "#BF00FF"
    },
    {
        "name": "Neon Coral",
        "hex": "#FF6F61"
    },
    {
        "name": "Vivid Red",
        "hex": "#FF0000"
    }
]

const UpdateBoardDialog: React.FC<UpdateBoardProps> = ({ isOpen, id, _title, _color, setIsOpen }) => {

  const [title, setTitle] = useState(_title)
  const [color, setColor] = useState(_color)

  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.update)

  const onClick = () => {

    if(!organization) return

    mutate({
      id,
      title,
      color
    })
      .then((id) => {
        toast.success('Board updated')
      })
      .catch((error) => {
        toast.error("Failed to updated board")
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <div className="flex flex-col gap-3">
          <label className="text-lg" htmlFor="input">Title</label>
          <Input autoComplete={'off'} value={title} id="input" onChange={e => setTitle(e.target.value)} />
        </div>
        <p className="text-lg">
          Color
        </p>
        <ul className="flex items-center justify-between">
          { colors.map(c => {
            return (
              <Hint label={ c.name } key={c.name} sideOffest={10}>
                <li
                  className={cn("w-6 h-6 rounded-full cursor-pointer", c.hex === color && 'border-2 border-black/30')}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setColor(c.hex)}
                />
              </Hint>
            )
          }) }
        </ul>
        <div className="w-full h-4 transition-all rounded-md" style={{ backgroundColor: color }} />

        <DialogClose className="w-full" disabled={ title.length < 3 && !pending }>
          <Button
            className="w-full"
            disabled={ title.length < 3 && !pending }
            onClick={onClick}
          >
            Update board
          </Button>
        </DialogClose>
        { (title.length < 3) && <p className="text-xs text-muted-foreground">Title must be at least 3 characters</p> }
      </DialogContent>
    </Dialog>
  )
}

export default UpdateBoardDialog