"use client"

import Pagina from '@/components/commom/Pagina'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import React from 'react'

function DashboardLayout({children}:{children: React.ReactNode}){
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Pagina>
       <div className="min-h-screen flex relative overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(39,39,42,0.8),#09090b)]">
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

     <div
        className={`fixed z-40 inset-y-0 left-0 w-64
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition duration-300 ease-in-out`}
      >
        <Sidebar onClose={() => setIsOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col w-full lg:ml-64">
        <div className="fixed top-0 left-0 lg:left-64 right-0 z-30">
          <Navbar onMenuClick={() => setIsOpen(true)} />
        </div>

        <main className="flex-1 px-6 sm:px-13 py-6 pt-20">{children}</main>
      </div>
    </div>
    </Pagina>  
  )
}

export default DashboardLayout;


