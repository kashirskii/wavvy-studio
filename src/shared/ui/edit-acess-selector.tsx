import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button
} from '@/shared/ui'

interface AccessSelectorProps {
  initialAccess: 'Public' | 'Unlisted' | 'Private'
  onChange?: (newAccess: 'Public' | 'Unlisted' | 'Private') => void
}

export function AccessSelector({ initialAccess, onChange }: AccessSelectorProps) {
  const [access, setAccess] = useState(initialAccess)

  const handleSelect = (value: 'Public' | 'Unlisted' | 'Private') => {
    setAccess(value)
    onChange?.(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className="w-full justify-between">
          {access} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {(['Public', 'Unlisted', 'Private'] as const).map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={() => handleSelect(option)}
            className={`flex justify-between ${
              access === option ? 'font-semibold' : ''
            }`}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
