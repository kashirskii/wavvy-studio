import * as React from 'react'
import { HelpCircle } from 'lucide-react'
import { Tooltip } from './tooltip'
import { cn } from '@/shared/lib/utils'

export interface InputProps extends React.ComponentProps<'input'> {
  tooltip?: string
}

export const Input = ({ className, type, tooltip, ...props }: InputProps) => {
  return (
    <div className="relative flex w-full items-center">
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pr-10 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {tooltip ? (
        <Tooltip text={tooltip}>
          <HelpCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
        </Tooltip>
      ) : null}
    </div>
  )
}
