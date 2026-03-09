"use client"

import registerAction from '@/actions/register.action'
import Pagina from '@/components/commom/Pagina'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { IconLock, IconMail, IconUser } from '@tabler/icons-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast'

const initialState = {
  error: undefined,
  fieldErrors:undefined,
  user: undefined
};

function Register() {
  const[state,formAction,isPending] = useActionState(registerAction,initialState);
  const router = useRouter();

  useEffect(()=>{
  if (state?.user) {
    router.push("/auth/login");
  }
  },[state?.user]);

  const tl = gsap.timeline();
    
    useGSAP(() => {
     tl.from(".gsap_form",{x:"-100vw",opacity:0,ease:"back.inOut",duration:1.5});
  } ,[]);

  return (
    <Pagina className="flex items-center justify-center p-3">
      <form action={formAction}
        className={`gsap_form w-full max-w-sm rounded-xl border border-white/10 bg-white/5 
        backdrop-blur-xl p-6 shadow-lg space-y-3 `}>
    
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>

        <Input type="text" name="name" placeholder="Username" Icon={IconUser} error={state?.fieldErrors?.name} />
        <Input type="email" name="email" placeholder="Email" Icon={IconMail} error={state?.fieldErrors?.email} />
        <Input type="password" name="password" placeholder="Password" Icon={IconLock} error={state?.fieldErrors?.password} />
    
        {state?.error && (
          <p className="text-sm text-red-500 text-center">{state.error}</p>
        )}
        {state?.user && (
          <p className="text-sm text-green-400 text-center">
            Account created successfully.
          </p>
        )}
        <Button label='Register' loading="Signing up..." isPending={isPending} />
        <p className="text-center text-sm text-zinc-400 mt-4">
            Already have an account?{" "}
            <Link  
              href="/auth/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
              onClick={()=>{
                toast.success("redirecting to login page")
              }}
            >
              Login
            </Link>
          </p>
      </form>
    </Pagina>
  )
}

export default Register
