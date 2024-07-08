import Image from "next/image"

interface EmptyFavoritesProps {
  
}

const EmptyFavorites: React.FC<EmptyFavoritesProps> = ({}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mt-6">
        No favorites boards!
      </h1>
      <p className="text-muted-foreground text-sm mt-2">
        You don't have any boards marked as favorite.
      </p>
    </div>
  )
}

export default EmptyFavorites