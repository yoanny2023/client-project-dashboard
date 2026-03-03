import React from 'react'
type ErrorProps = {
  message: string
}

function Error({message}: ErrorProps) {
  return (
    <p className="text-red-500 text-sm">{message}</p>
  )
}

export default Error
