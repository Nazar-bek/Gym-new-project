import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { LucideLoader } from 'lucide-react'

const FillLoading = () => {
  return (
    <Skeleton className='absolute inset-0 w-full h-full z-50 flex items-center justify-center'>
        <LucideLoader className='animate-spin'/>
    </Skeleton>
  )
}

export default FillLoading