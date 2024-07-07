import List from "./List"
import NewButton from "./NewButton"

interface indexProps {
  
}

export const Sidebar: React.FC<indexProps> = ({}) => {
  return (
    <aside className="fixed z-[999] left-0 bg-brand-blue text-brand-white h-full w-[60px] flex p-3 flex-col gap-y-4">
      <List />
      <NewButton />
    </aside>
  )
}