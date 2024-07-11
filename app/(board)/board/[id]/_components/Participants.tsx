'use client'

import { useOthers, useSelf } from "@/liveblocks.config"
import UserAvatar from "./UserAvatar"
import { getRandomColorFromId } from "@/lib/utils"

interface ParticipantsProps {
  
}

const usersLimit = 2

const Participants: React.FC<ParticipantsProps> = ({}) => {

  const users = useOthers()
  const currentUser = useSelf()
  const hasMoreUsers = users.length > usersLimit

  return (
    <main className="absolute top-2 right-2 bg-white rounded-md px-5 h-12 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, usersLimit).map(( { connectionId, info } ) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
              borderColor={ getRandomColorFromId(connectionId) }
            />
          )
        })}

        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            name={currentUser.info?.name + ' (You)'}
            fallback={currentUser.info?.name?.[0]}
            borderColor={ getRandomColorFromId(currentUser.connectionId) }
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - usersLimit} more`}
            fallback={`+${users.length - usersLimit}`}
          />
        )}

      </div>
    </main>
  )
}

export default Participants