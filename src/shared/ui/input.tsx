import * as React from 'react'
import { HelpCircle } from 'lucide-react'
import { Tooltip } from './tooltip'
import { cn } from '@/shared/lib/utils'

type InputProps = React.ComponentProps<'input'> & {
  tooltip?: boolean
  tooltipIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  tooltipText?: string
  tooltipClick?: () => void
  children?: React.ReactNode
}

function Input({
  className,
  type,
  tooltip,
  tooltipIcon: TooltipIcon,
  tooltipText,
  tooltipClick,
  ...props
}: InputProps) {
  const IconComponent = TooltipIcon || (tooltip ? HelpCircle : null)

  const rightButton = tooltip && IconComponent && (
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      {tooltipText ? (
        <Tooltip text={tooltipText}>
          <button
            type="button"
            onClick={tooltipClick}
            className="text-muted-foreground hover:text-foreground focus:outline-none transition-colors cursor-help"
          >
            <IconComponent className="w-4 h-4" />
          </button>
        </Tooltip>
      ) : (
        <button
          type="button"
          onClick={tooltipClick}
          className="text-muted-foreground hover:text-foreground focus:outline-none transition-colors cursor-help"
        >
          <IconComponent className="w-4 h-4" />
        </button>
      )}
    </div>
  )

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
      {rightButton}
      {props.children}
    </div>
  )
}

export { Input }
