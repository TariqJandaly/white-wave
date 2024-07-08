'use client'

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs"
import SearchInput from "./SearchInput"
import EditButton from "./EditButton"

interface NavbarProps {
  
}

const Navbar: React.FC<NavbarProps> = ({}) => {

  const { organization } = useOrganization()

  return (
    <main className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden w-full">
        <OrganizationSwitcher 
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '376px'
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
      </div>
      { organization && (
        <EditButton />
      )}
      <UserButton />
    </main>
  )
}

export default Navbar