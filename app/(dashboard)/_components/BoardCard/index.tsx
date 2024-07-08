'use client'

import Actions from "@/components/Actions"
import { useAuth } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal, Star } from "lucide-react"
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
              { title.length > 13 ? 
                `${ title.slice(0, 13) }...` :
                title
              }
            </p>
            <div className="opacity-0 group-hover:opacity-100 transition-all">
              <p className="text-xs text-muted-foreground">
                { author }, { formatDistanceToNow(createdAt, { addSuffix: true }) }
              </p>
              <button onClick={() => {}} className="absolute right-3 top-3">
                { isFavorite ?
                  <Star className="w-4 h-4 text-brand-blue fill-brand-blue hover:fill-brand-blue/30 transition-all" /> :
                  <Star className="w-4 h-4 hover:text-brand-blue transition-all" />
                }
              </button>
            </div>
          </div>
          <Actions title={ title } id={ id } color={ color } side="right" sideOffset={15} >
            <button className="absolute top-3 right-3 p-3 outline-none">
              <MoreHorizontal className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
      </div>
    </Link>
  )
}

export default BoardCard