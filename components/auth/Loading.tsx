import Image from "next/image";

interface loadingProps {
  
}

const Loading: React.FC<loadingProps> = ({}) => {
  return (
    <div className="size-full flex flex-col justify-center items-center">
      <Image 
        src={'/logo.svg'}
        alt="logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  )
}

export default Loading