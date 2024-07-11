'use client'

import { LucideIcon } from "lucide-react"

import Hint from '@/components/Hint'
import { Button } from "@/components/ui/button"

interface ToolButtonProps {
  label: string
  icon: LucideIcon
  onClick: () => void
  isActive?: boolean
  isDisabled?: boolean
}

const ToolButton: React.FC<ToolButtonProps> = ({ label, icon: Icon, onClick, isActive, isDisabled }) => {
  return (
    <Hint label={label} side="top" sideOffest={14}>
      <Button disabled={isDisabled} onClick={onClick} size={'icon'} variant={isActive ? 'boardActive' : 'board'}>
        <Icon />
      </Button>
    </Hint>
  )
}

export default ToolButton

