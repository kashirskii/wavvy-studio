import type { ComponentProps, ReactNode } from 'react';
import { Button, Sheet, SheetTrigger, SheetContent } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

export interface FooterItem {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

export interface SidebarFooterProps extends ComponentProps<'div'> {
  items: Array<FooterItem>;
}

export function SidebarFooter({
  items,
  className,
  ...props
}: SidebarFooterProps) {
  return (
    <div className={cn('space-y-2 p-2', className)} {...props}>
      {items.map(({ label, icon, content }) => (
        <Sheet key={label}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="w-full flex items-center justify-center">
              {icon && <span className="mr-2">{icon}</span>}
              {label}
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            {content}
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
