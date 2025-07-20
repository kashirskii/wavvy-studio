import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button, Input, type InputProps } from '@/shared/ui'

interface SecureInputProps extends Omit<InputProps, 'tooltip'> {}

export const SecureInput = (props: SecureInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} className="pr-10" {...props} />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-1 top-1/2 -translate-y-1/2"
        tabIndex={-1}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  )
}
