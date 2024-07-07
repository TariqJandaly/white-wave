"use client"

import qs from 'query-string'
import { Search } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'
import { useRouter } from 'next/navigation'

import {
  ChangeEvent,
  useEffect,
  useState
} from 'react'
import { Input } from '@/components/ui/input'

interface SearchInputProps {
  
}

const SearchInput: React.FC<SearchInputProps> = ({}) => {

  const router = useRouter()
  const [value, setValue] = useState("")
  const debouncedValue = useDebounceValue(value, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: '/',
      query: {
        search: debouncedValue[0]
      }
    }, { skipEmptyString: true, skipNull: true })

    router.push(url)
  }, [router, debouncedValue])

  return (
    <div className='w-full relative'>
      <Search
        className='absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground h-4 w-4'
      />
      <Input
        className='w-full max-w-[516px] pl-9 bg-brand-white'
        placeholder='Search'
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}

export default SearchInput