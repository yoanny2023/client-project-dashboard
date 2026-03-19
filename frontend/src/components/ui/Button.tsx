import React from 'react'
import { useFormStatus } from "react-dom";

type ButtonProps = React.ComponentProps<"button"> & {
loading?: string,
label:string
}

function Button({label,loading,...props}: ButtonProps) {
  const{pending} = useFormStatus();

  return (
    <button
      type="submit"
      {...props}
      disabled={pending}
      className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition duration-300"
    >
      {pending ? loading :label} 
    </button>
  )
}

export default Button
