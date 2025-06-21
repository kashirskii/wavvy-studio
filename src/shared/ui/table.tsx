import { cn } from '../lib/utils'

export const Table = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className="overflow-x-auto border rounded-2xl shadow-sm">
      <div
        className={cn(
          'flex-col bg-background min-w-max [&>:not(:last-child)]:border-b-[1px]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

export const TableRow = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('flex transition-all hover:bg-muted bg-inherit', className)} {...props}>
      {children}
    </div>
  )
}

export const TableHeader = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('flex sticky top-0 z-10 bg-inherit font-medium', className)} {...props}>
      {children}
    </div>
  )
}

export const TableCell = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('flex grow-1 basis-24 min-w-24 px-4 py-4 bg-inherit', className)} {...props}>
      {children}
    </div>
  )
}
