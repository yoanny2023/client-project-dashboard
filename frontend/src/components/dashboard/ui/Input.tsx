import React from 'react'

type InputProps = React.ComponentProps<"input"> & {
  placeholder: string,
  setInput: (value: React.SetStateAction<string>) => void
}

function Input({type,placeholder,setInput,...props}:InputProps) {
  return (
    <input type={type ? "email" : "text"} name={props.name} placeholder={placeholder} required {...props}
      className="w-full px-3 py-2 rounded focus:ring-2 focus:ring-indigo-600 outline-none bg-zinc-700
      transition duration-300
      "
      onChange={(e) => setInput(e.target.value)}
    />   
  );
}

export default Input
