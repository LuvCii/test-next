import { LayoutProps } from '@/models/Layout'
import React from 'react'

const LayoutEmpty = ({children}: LayoutProps) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default LayoutEmpty