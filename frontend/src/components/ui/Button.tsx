import React from 'react'

type ButtonProps = React.ComponentProps<"button"> & {
isPending?: boolean
loading?: string,
label:string
}

function Button({isPending,label,...props}: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      {...props}
      className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 hover:cursor-pointer disabled:opacity-50 transition duration-300"
    >
      {isPending ? props.loading :label} 
    </button>
  )
}

export default Button
