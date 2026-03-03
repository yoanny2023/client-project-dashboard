import React, {useState } from 'react'

type InputProps = React.ComponentProps<"input"> & {
label?:string,
Icon?:any,
error?:string
}

function Input({type, error, Icon, ...props}: InputProps) {
  const[showPassword,setShowPassword] = useState(false);

  function handleShowPassword(){
    setShowPassword(!showPassword)
  }

  return (
    <>
    <div className={`flex justify-center items-center gap-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700 
      hover:border-indigo-500 outline-none transition duration-300`}>
      <input  
        className="flex-1 text-sm focus:outline-none bg-transparent" 
        type={showPassword ? "text" : type} required id={props.name} name={props.name} {...props}/>
        {Icon && (
        <Icon className="cursor-pointer text-indigo-500" stroke={1} size={18} 
        onClick={handleShowPassword}          
      />)}
    </div>
    {error && <p className='text-sm text-red-500'>{error}</p>}
    </>
  )
}

export default Input;

