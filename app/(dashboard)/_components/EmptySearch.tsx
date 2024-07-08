import Image from "next/image"

interface EmptySearchProps {
  
}

const EmptySearch: React.FC<EmptySearchProps> = ({}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mt-6">
        No resultes found!
      </h1>
      <p className="text-muted-foreground text-sm mt-2">
        The board you searched for does not exist.
      </p>
    </div>
  )
}

export default EmptySearch