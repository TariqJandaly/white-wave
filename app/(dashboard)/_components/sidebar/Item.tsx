"use client"

import Image from "next/image"
import {
  useOrganization,
  useOrganizationList
} from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import Hint from "@/components/Hint"

interface ItemProps {
  id: string,
  name: string,
  imageUrl: string
}

const Item: React.FC<ItemProps> = ({ id, name, imageUrl }) => {

  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()

  const isActive = organization?.id === id

  const onClick = () => {
    if(!setActive) return

    setActive({ organization: id })
  }


  return (
    <div className="aspect-square relative">
      <Hint label={ name } side="right" align="start" sideOffest={18}>
        <Image 
          fill
          src={imageUrl}
          alt={name}
          onClick={onClick}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  )
}

export default Item