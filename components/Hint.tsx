import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface HintProps {
  label: string
  children: React.ReactNode
  side?: 'top' | 'left' | 'bottom' | 'right'
  align?: 'start' | 'center' | 'end'
  sideOffest?: number
  alignOffest?: number
}

const Hint: React.FC<HintProps> = ({
  label,
  children,
  align,
  side,
  alignOffest,
  sideOffest
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          { children }
        </TooltipTrigger>
        <TooltipContent
          className='text-brand-white bg-brand-navy border-brand-navy'
          side={side}
          align={align}
          sideOffset={sideOffest}
          alignOffset={alignOffest}
        >
          <p className='font-semibold capitalize'>
            { label }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Hint