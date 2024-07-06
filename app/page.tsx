import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"


// Wave Blue: #4A90E2
// Seafoam Green: #7FDBB6
// Soft White: #F5F5F5
// Deep Navy: #002D72
// Sand Beige: #D5C6B2
// Coral: #FF6F61
// Light Gray: #D9E1E8

interface pageProps {
  
}

const page: React.FC<pageProps> = ({}) => {
  return (
    <main>
        <UserButton />
    </main>
  )
}

export default page