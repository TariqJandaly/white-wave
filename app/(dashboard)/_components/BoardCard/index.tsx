'use client'

import { useAuth } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { Star } from "lucide-react"
import Link from "next/link"

interface BoardCardProps {
  id: string
  orgId: string
  title: string
  authorId: string
  authorName: string
  color: string
  isFavorite: boolean
  createdAt: number
}

const BoardCard: React.FC<BoardCardProps> = ({ id, orgId, title, authorId, authorName, color, isFavorite, createdAt }) => {

  const { userId } = useAuth()

  const author = userId === authorId ? "You" : authorName

  const changeFav = () => {

  }

  return (
    <Link
      href={`/boards/${id}`}
      className="group"
    >
      <div className="aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden hover:scale-105 transition-all">
        <div className="relative flex-1 bg-amber-50">
          <div className="relative w-full h-3/4" style={{ backgroundColor: color }}>
          </div>

          <div className="relative pl-3 pt-2">
            <p className="text-lg">
              { title.length > 17 ? 
                `${ title.slice(0, 17) }...` :
                title
              }
            </p>
            <p className="text-xs text-muted-foreground">
              { author }, { formatDistanceToNow(createdAt, { addSuffix: true }) }
            </p>
          </div>
          <button onClick={() => {}} className="absolute top-5 right-5">
            { isFavorite ?
              <Star className="text-brand-blue fill-brand-blue hover:fill-brand-blue/30 transition-all" /> :
              <Star className="hover:text-brand-blue transition-all" />
            }
          </button>
        </div>
      </div>
    </Link>
  )
}

export default BoardCard