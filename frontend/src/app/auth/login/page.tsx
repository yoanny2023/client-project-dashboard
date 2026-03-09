"use client";

import loginAction from '@/actions/login.action'
import Pagina from '@/components/commom/Pagina';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { IconLock, IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import { SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText);

const initialState = {
  error: undefined,
  fieldErrors:undefined,
  user: undefined
}
 
function Login() {

  const[state,formAction,isPending] = useActionState(loginAction,initialState);
  const{setUser} = useAuth();
  const router = useRouter();
  
  useEffect(() => {    
    if(state?.user){
      setUser(state.user)
      router.push("/dashboard")
    }
  },[state?.user]);

  const tl = gsap.timeline();
  
  useGSAP(() => {
   const headerSplit = new SplitText(".header",{type:"chars,words"});

   tl.from(headerSplit.chars,{yPercent:100,ease:"expo.out",duration:0.8,stagger: 0.03})
   tl.from(".sub_header",{y:20,opacity:0,ease:"power1.inOut",duration:0.8},">-0.3");
   tl.from(".gsap_form",{x:"-100vw",opacity:0,ease:"back.inOut",duration:2},">-0.5");
  },[]);
  
  return (
    <Pagina className="flex flex-col items-center justify-center p-3">
      <div className="text-center space-y-3 mb-8">
        <h1 className="header text-3xl md:text-4xl font-bold text-white">
          Manage Clients & Projects with Ease
        </h1>

        <p className="sub_header text-zinc-400 text-sm md:text-base max-w-md mx-auto">
          A Friendly dashboard to organize your clients, track projects, and stay in control of your work.
        </p>
      </div>
      <form action={formAction}
        className={`gsap_form w-full max-w-sm rounded-xl border border-white/10 bg-white/5 
        backdrop-blur-xl p-6 shadow-lg space-y-4`}>

        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <Input type="email" name="email" placeholder="Email" Icon={IconMail} error={state?.fieldErrors?.email} />
        <Input type="password" name="password" placeholder="Password" Icon={IconLock} error={state?.fieldErrors?.password} />

        {state?.error && (
          <p className="text-sm text-red-400 text-center">{state.error}</p>
        )}
        <Button label='Login' loading="Logging in..." isPending={isPending} />
        <p className="text-center text-sm text-zinc-400 mt-4">
            Don’t have an account yet?{" "}
            <Link  
              href="/auth/register"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
               onClick={()=>{
                toast.success("redirecting to register page")
              }}
            >
              Sign up
            </Link>
          </p>
      </form>
    </Pagina>
  )
}

export default Login
