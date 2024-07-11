import Hint from "@/components/Hint"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  src?: string
  name?: string
  fallback?: string
  borderColor?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name, fallback, borderColor }) => {
  return (
    <Hint label={name || "Teammate"} side="bottom" sideOffest={18}>
      <Avatar className="h-8 w-8 border-2" style={{
        borderColor: borderColor
      }}>

        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-extrabold">
          { fallback }
        </AvatarFallback>

      </Avatar>
    </Hint>
  )
}

export default UserAvatar