import React from 'react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/spinner'

export function LoadingButton({
  loading,
  children,
  className,
  ...rest
}: React.ComponentProps<'button'> & {
  loading: boolean
}) {
  return (
    <Button className={cn('relative', className)} {...rest}>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}
      <span className={loading ? 'invisible' : ''}>{children}</span>
    </Button>
  )
}
