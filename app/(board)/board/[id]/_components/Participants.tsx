interface ParticipantsProps {
  
}

const Participants: React.FC<ParticipantsProps> = ({}) => {
  return (
    <main className="absolute top-2 right-2 bg-white rounded-md px-5 h-12 flex items-center shadow-md">
      <div className="flex justify-between items-center">
        Participants
      </div>
    </main>
  )
}

export default Participants