'use client'

import { useAuth, ClerkProvider } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { 
  AuthLoading,
  Authenticated,
  ConvexReactClient
} from "convex/react"
import Loading from "@/components/auth/loading"


interface convexClientProviderProps {
  children: React.ReactNode  
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl)

const ConvexClientProvider: React.FC<convexClientProviderProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>
          { children }
        </Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexClientProvider