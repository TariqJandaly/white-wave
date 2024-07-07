import { UserButton } from "@clerk/nextjs"

interface NavbarProps {
  
}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <main className="flex items-center gap-x-4 p-5 bg-brand-green">
      <div className="hidden lg:flex lg:flex-1">
        {/* Add search */}
      </div>
      <UserButton />
    </main>
  )
}

export default Navbar