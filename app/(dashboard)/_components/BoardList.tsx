import EmptyBoards from "./EmptyBoards"
import EmptyFavorites from "./EmptyFavorites"
import EmptySearch from "./EmptySearch"

interface BoardListProps {
  organizationId: string
  query: {
    search?: string
    favorites?: string
  }
}

const BoardList: React.FC<BoardListProps> = ({ organizationId, query }) => {

  const data = [] // TODO: Change into an api call

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
      
    </main>
  )
}

export default BoardList