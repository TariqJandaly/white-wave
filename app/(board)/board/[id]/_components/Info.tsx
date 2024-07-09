import { Home } from "lucide-react"
import Link from "next/link"

interface InfoProps {
  boardId: string
}

const Info: React.FC<InfoProps> = ({ boardId }) => {
  return (
    <main className="absolute top-2 left-2 bg-white rounded-md px-5 h-12 flex items-center shadow-md">
      <div className="flex justify-between items-center">
        <Link href='/'>
          <Home className="w-4 h-4" />
        </Link>
        { boardId }
      </div>
    </main>
  )
}

export default Info