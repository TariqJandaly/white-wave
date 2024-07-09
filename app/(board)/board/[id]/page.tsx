import Room from "@/components/Room"
import Canvas from "./_components/Canvas"
import Loading from "@/components/auth/Loading"

interface pageProps {
  params: {
    id: string
  }
}

const page: React.FC<pageProps> = ({ params }) => {
  return (
    <Room roomId={ params.id } fallback={<Loading />}>
      <Canvas boardId={params.id} />
    </Room>
  )
}

export default page