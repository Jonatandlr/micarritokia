import React from "react";

interface NavBarProps {
    title: string;
}

export default function NavBar({title}: NavBarProps) {
  return (
    <nav className="bg-primary py-5 flex justify-between px-3 items-center">
      <img src="/logo.svg" alt="" />
      <h1 className="font-bold text-xl text-white">{title}</h1>
    </nav>
  );
}
