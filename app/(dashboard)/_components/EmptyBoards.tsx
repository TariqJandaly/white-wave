import { Button } from "@/components/ui/button"

interface EmptyBoardsProps {
  
}

const EmptyBoards: React.FC<EmptyBoardsProps> = ({}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mt-6">
        Create your first board!
      </h1>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization.
      </p>
      <div className="mt-6">
        <Button size={'lg'}>
          Create board
        </Button>
      </div>
    </div>
  )
}

export default EmptyBoards