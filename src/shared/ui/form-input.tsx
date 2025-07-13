import * as React from 'react'
import { HelpCircle } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'
import { cn } from '@/shared/lib/utils'

interface CustomInputWithHelpProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helpText?: string
  error?: string
  containerClassName?: string
}

export const FormInput = React.forwardRef<HTMLInputElement, CustomInputWithHelpProps>(
  ({ className, label, helpText, error, containerClassName, id, ...props }, ref) => {
    const inputId = React.useId()
    const finalId = id || inputId

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <div className="flex items-center gap-2">
            <Label htmlFor={finalId} className="text-sm font-medium">
              {label}
            </Label>
            {helpText && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{helpText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
        <div className="relative">
          <Input
            id={finalId}
            className={cn(error && 'border-destructive focus-visible:ring-destructive', className)}
            ref={ref}
            {...props} // This spreads all remaining props including value and onChange
          />
          {!label && helpText && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{helpText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  },
)
