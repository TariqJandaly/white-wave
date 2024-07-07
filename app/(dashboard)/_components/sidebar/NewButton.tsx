'use client'

import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import Hint from "@/components/Hint"

interface NewButtonProps {
  
}

const NewButton: React.FC<NewButtonProps> = ({}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint label="Create organization" side="right" align="start" sideOffest={18}>
            <button className="bg-brand-white/25 h-full w-full flex justify-center items-center rounded-md opacity-60 hover:opacity-100 transition">
              <Plus className="text-brand-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none">
        <CreateOrganization routing="hash" />
      </DialogContent>
    </Dialog>
  )
}

export default NewButton