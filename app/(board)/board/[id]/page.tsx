import Canvas from "./_components/Canvas"

interface pageProps {
  params: {
    id: string
  }
}

const page: React.FC<pageProps> = ({ params }) => {
  return (
    <Canvas boardId={params.id} />
  )
}

export default page