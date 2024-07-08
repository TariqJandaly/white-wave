import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization, OrganizationSwitcher } from "@clerk/nextjs"
import Image from "next/image"

interface EmptyOrgProps {
  
}

const EmptyOrg: React.FC<EmptyOrgProps> = ({}) => {
  return (
    <main className="h-full flex gap-10 flex-col justify-center items-center">
      <Image 
        src={'/logo.svg'}
        alt="logo"
        width={120}
        height={120}
      />
      <h1 className="text-3xl font-bold">
        Welcome to {' '}
        <span className="font-black bg-gradient-to-r bg-clip-text text-transparent from-brand-green to-brand-navy animate-gradient">
          White Wave
        </span>
      </h1>
      <p>Create or join an organization to get started</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={'lg'}>
            Start now!
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[420px]">
          <CreateOrganization routing='hash' />
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default EmptyOrg