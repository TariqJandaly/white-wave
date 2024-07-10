'use client'

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link2, PencilRuler, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/useApiMutation"
import { api } from "@/convex/_generated/api"
import UpdateBoardDialog from "./UpdateBoardDialog"
import { useState } from "react"
import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']

  id: string
  title: string
  color: string
}

const Actions: React.FC<ActionsProps> = ({ children, side, sideOffset, id, title, color }) => {

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const router = useRouter()

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
    setIsDeleteOpen(false)
    mutate({ id })

    .then(() => {
      toast.message("Deleted successfully")
      router.push('/')
      
    })
    .catch(() => {
      toast.error("Faild to delete the board")
    })
  }

  return (
    <div onClick={(e) => { e.stopPropagation() }}>
      <UpdateBoardDialog isOpen={isEditOpen} setIsOpen={setIsEditOpen} id={id} _title={title} _color={color} />
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent autoFocus={false} className="outline-none">
          <div className="flex flex-col gap-5 p-5">
            <h1 className="text-lg">
              Are you sure you want to delete this board?
              <p className="text-xs text-muted-foreground">
                This change could not be reversed.
              </p>
            </h1>
            <div className="flex gap-5">
              <Button onClick={() => setIsDeleteOpen(false)} variant={'outline'} className="w-full">
                Cancel
              </Button>
              <Button onClick={onDelete} variant={'destructive'} className="w-full">
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
            onClick={() => setIsEditOpen(true)}
          >
            <PencilRuler className="h-4 w-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="p-3 cursor-pointer text-red-500"
            onClick={() => setIsDeleteOpen(true)}
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