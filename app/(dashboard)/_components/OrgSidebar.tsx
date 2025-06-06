'use client'

import Link from "next/link"
import Image from "next/image"
import { Poppins } from "next/font/google"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Star } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const font = Poppins({
  subsets: ['latin'],
  weight: '600'
})

interface OrgSidebarProps {
  
}

const OrgSidebar: React.FC<OrgSidebarProps> = ({}) => {

  const searchParams = useSearchParams()
  const favorites = searchParams.get('favorites')

  return (
    <main className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 border-r pr-5">
      <Link href={'/'}>
        <div className="flex items-center gap-x-2">
          <Image 
            src={'/logo.svg'}
            alt="logo"
            height={30}
            width={30}
          />
          <p className={cn("font-bold", font.className)}>
            White wave
          </p>
        </div>
      </Link>

      <OrganizationSwitcher 
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #D9E1E8',
              justifyContent: 'space-between',
              backgroundColor: '#F5F5F5'
            }
          }
        }}
      />

      <div className="space-y-1 w-full">
        <Button asChild
          variant={favorites ? 'ghost' : 'secondary'}
          size={'lg'}
          className="font-normal justify-start px-2 w-full"
        >
          <Link href={'/'}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team boards
          </Link>
        </Button>
        <Button asChild
          variant={!favorites ? 'ghost' : 'secondary'}
          size={'lg'}
          className="font-normal justify-start px-2 w-full"
        >
          <Link href={{
            auth: '/',
            query: { favorites: true }
          }}>
            <Star className="h-4 w-4 mr-2" />
            Favorite boards
          </Link>
        </Button>
        {/* <Button asChild size={'lg'} variant={'ghost'} className="font-normal justify-start px-2 w-full">
          <Link href={'/'}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team boards
          </Link>
        </Button> */}
      </div>
    </main>
  )
}

export default OrgSidebar