import { useQuery } from "convex/react"
import EmptyBoards from "./EmptyBoards"
import EmptyFavorites from "./EmptyFavorites"
import EmptySearch from "./EmptySearch"
import { api } from "@/convex/_generated/api"
import Loading from "@/components/auth/Loading"
import BoardCard from "./BoardCard"
import CreateBoardDialog from "./CreateBoardDialog"
import { Plus } from "lucide-react"

interface BoardListProps {
  organizationId: string
  query: {
    search?: string
    favorites?: string
  }
}

const BoardList: React.FC<BoardListProps> = ({ organizationId, query }) => {

  const data = useQuery(api.boards.get, { orgId: organizationId })

  if(data === undefined) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mt-6 animate-pulse">
          Loading...
        </h1>
      </div>
    )
  }

  if(!data?.length && query?.search ) {
    return (
      <EmptySearch />
    )
  }

  if(!data?.length && query?.favorites) {
    return (
      <EmptyFavorites />
    )
  }

  if(!data?.length) {
    return (
      <EmptyBoards />
    )
  }

  return (
    <main>
      <h2 className="text-3xl">
        { query.favorites ? "Favorite boards" : "Team boards" }
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">

        
        <CreateBoardDialog>
          <button className="aspect-[100/127] border rounded-lg flex justify-center items-center overflow-hidden hover:scale-105 transition-all bg-brand-blue">
            <Plus className="text-brand-white" width={30} height={30} />
          </button>
        </CreateBoardDialog>

        { data.map(board => {
          return (
            <BoardCard
              key={board._id}
              id={board._id}
              title={board.title}
              color={board.color}
              authorId={board.authorId}
              authorName={board.authorName}
              createdAt={board._creationTime}
              orgId={board.orgId}
              isFavorite={false}
            />
          )
        }) }
      </div>
    </main>
  )
}

export default BoardList