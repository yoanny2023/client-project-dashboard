import { IconLayoutDashboard, IconUsers, IconX } from '@tabler/icons-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

type SidebarProps = {
  onClose?: () => void;
};

 const navItems = [
  { label: "Overview", href: "/dashboard", icon:<IconLayoutDashboard stroke={2} size={18} /> },
  { label: "Clients", href: "/dashboard/clients", icon:<IconUsers stroke={2} size={18} /> },
];

function Sidebar({ onClose }: SidebarProps) {
 const pathname = usePathname();
 
  return (
      <aside className="h-full bg-zinc-800 border-r border-zinc-700 flex flex-col">
      <div className="flex items-center justify-between p-4 lg:hidden">
        <span className="font-bold">Dashboard</span>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-600 cursor-pointer transition duration-300"
        >
          <IconX stroke={2} size={18} />
        </button>
      </div>
      <div className="hidden lg:block p-4 font-bold text-lg">
        Dashboard
      </div>

      <nav className="px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}
              onClick={onClose} 
              className={`flex items-center gap-1 block rounded px-3 py-2 text-sm transition duration-500
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-200 hover:bg-zinc-700"
                }`}
            >
             {item.icon} {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
