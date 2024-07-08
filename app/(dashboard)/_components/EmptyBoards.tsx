"use client"

import { api } from "@/convex/_generated/api"

import { Button } from "@/components/ui/button"
import { useOrganization } from "@clerk/nextjs"
import { useApiMutation } from "@/hooks/useApiMutation"
import { toast } from "sonner"

interface EmptyBoardsProps {
  
}

const EmptyBoards: React.FC<EmptyBoardsProps> = ({}) => {

  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    if(!organization) return

    mutate({
      title: 'title',
      color: '#545265',
      orgId: organization.id
    })
      .then((id) => {
        toast.success('Board created')
        // TODO: redirect the user to board/{id}
      })
      .catch((error) => {
        toast.error("Failed to create board")
      })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mt-6">
        Create your first board!
      </h1>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization.
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size={'lg'}>
          Create board
        </Button>
      </div>
    </div>
  )
}

export default EmptyBoards