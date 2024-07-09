'use client'

import { Button } from "@/components/ui/button"
import UpdateBoardDialog from "@/components/UpdateBoardDialog"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useApiMutation } from "@/hooks/useApiMutation"
import { useQuery } from "convex/react"
import { Home, Pencil } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface InfoProps {
  boardId: string
}

const Info: React.FC<InfoProps> = ({ boardId }) => {

  const [isEditBoardOpen, setIsEditBoardOpen] = useState(false)


  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">
  })

  

  return (
    <main className="absolute top-2 left-2 bg-white rounded-md px-5 h-12 flex items-center gap-5 shadow-md">
      <div className="flex justify-between items-center">
        <Link href='/'>
          <Image
            src={'/logo.svg'} 
            alt="logo"
            width={100}
            height={100}
            className="w-6 h-6"
          />
        </Link>
      </div>
      <div>
        { data?.title }
      </div>
      <div className="w-4 h-4 rounded-full border-2 border-black/20" style={{
        backgroundColor: data?.color
      }} />
      { data &&
        <>
          <Button onClick={() => setIsEditBoardOpen(true)} className="flex items-center gap-2 hover:bg-transparent" variant={'ghost'}>
            <Pencil size={20} />
            Edit board
          </Button>
          <UpdateBoardDialog isOpen={isEditBoardOpen} setIsOpen={setIsEditBoardOpen} id={ data?._id! } _color={ data?.color! } _title={ data?.title! } />
        </>
      }
    </main>
  )
}

export default Info