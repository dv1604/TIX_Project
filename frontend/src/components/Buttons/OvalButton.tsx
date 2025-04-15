import { Button } from '@mui/material'
import React, { ReactNode } from 'react'

const OvalButton:React.FC<{
  children : ReactNode,
  onClick: () => void
}> = ({children , onClick}) => {
  return (
    <Button
    onClick={onClick}
    sx={{
      border: '1px solid rgba(51, 61, 88, 1)',
      borderRadius: '23px',
      color: 'inherit',
      textTransform: 'capitalize',
      
    }}>{children}</Button>
  )
}

export default OvalButton
