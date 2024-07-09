interface layoutProps {
  children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <main className="w-screen h-screen">
      { children }
    </main>
  )
}

export default layout