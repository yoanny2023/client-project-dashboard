"use client"
import React from "react";  

type PaginaProps = {
  children: React.ReactNode;
  className?: string;
};

function Pagina({ children,className}: PaginaProps) {
  return (
    <div
      className={`min-h-dvh text-zinc-100 bg-[radial-gradient(circle_at_top,rgba(39,39,42,0.8),#09090b)] ${className ?? ""}`}  
    >
      {children}
    </div>
  );
}

export default Pagina;
