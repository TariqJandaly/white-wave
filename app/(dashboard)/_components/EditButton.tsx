import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { OrganizationProfile } from "@clerk/nextjs"
import { Edit } from "lucide-react"

interface InviteButtonProps {
  
}

const InviteButton: React.FC<InviteButtonProps> = ({}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          <Edit className="h-4 w-4 mr-2" />
          Edit organization
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  )
}

export default InviteButton