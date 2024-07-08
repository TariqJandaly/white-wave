'use client'

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/useApiMutation"
import { api } from "@/convex/_generated/api"
import UpdateBoardDialog from "./UpdateBoardDialog"
import { useState } from "react"

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']

  id: string
  title: string
  color: string
}

const Actions: React.FC<ActionsProps> = ({ children, side, sideOffset, id, title, color }) => {

  const [isOpen, setIsOpen] = useState(false)

  const { mutate, pending } = useApiMutation(api.board.remove)

  const onCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.message("Link copied")
      })
      .catch(() => {
        toast.error("Faild to copy the link")
      })
  }

  const onDelete = () => {
    mutate({ id })
    .then(() => {
      toast.message("Deleted successfully")
    })
    .catch(() => {
      toast.error("Faild to delete the board")
    })
  }

  return (
    <div onClick={(e) => { e.stopPropagation() }}>
      <UpdateBoardDialog isOpen={isOpen} setIsOpen={setIsOpen} id={id} _title={title} _color={color} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          { children }
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={side}
          sideOffset={sideOffset}
          className="w-60 scale-80"
        >
          <DropdownMenuItem
            className="p-3 cursor-pointer"
            onClick={onCopyLink}
          >
            <Link2 className="h-4 w-4 mr-2" />
            Copy board link
          </DropdownMenuItem>
          <DropdownMenuItem
            className="p-3 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="p-3 cursor-pointer text-red-500"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Actions