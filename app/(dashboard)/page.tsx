"use client"

import { useOrganization } from "@clerk/nextjs"
import EmptyOrg from "./_components/EmptyOrg"
import BoardList from "./_components/BoardList"

interface pageProps {
  searchParams: {
    search?: string,
    favorites?: string
  }
}

const page: React.FC<pageProps> = ({ searchParams }) => {

  const { organization } = useOrganization()

  return (
    <main className="flex-1 h-[calc(100%-80px)] max-w-[calc(100%-20px)] p-6 overflow-x-hidden">
      { !organization ? 
        <EmptyOrg />
        :
        <BoardList
          organizationId={organization.id}
          query={searchParams}
        />
      }
    </main>
  )
}

export default page