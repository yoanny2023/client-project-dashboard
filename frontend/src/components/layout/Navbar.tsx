"use client";

import { useAuth } from '@/contexts/AuthContext';
import { IconMenu3 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'
import React from 'react'

type NavBarProps = {
  onMenuClick?: () => void
}

function Navbar({onMenuClick}: NavBarProps) {
  const router = useRouter();
  const{logout,user} = useAuth();

  async function handleLogout(){
    await logout()
    router.replace("/auth/login")
  }

  return (
       <header className="h-16 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between px-6 sm:px-13">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-zinc-200 cursor-pointer"
      >
        <IconMenu3 stroke={2} color='#4f46e5' size={18} />
      </button>

      <span className="text-sm text-zinc-300">
        {user ? `Logged in as ${user.name}` : "Dashboard"}
      </span>

      <button
        onClick={handleLogout}
        className="text-sm text-red-500 hover:text-red-600 transition duration-300 cursor-pointer"
      >
        Logout
      </button>
    </header>
  )
}

export default Navbar
