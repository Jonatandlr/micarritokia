import React from "react";
import MaxWithWrapper from "./MaxWidthWrapper";

interface NavBarProps {
  title: string;
}

export default function NavBar({ title }: NavBarProps) {
  return (
    <nav className="bg-primary py-5 ">
      <MaxWithWrapper className="flex justify-between px-3 items-center">
        <a href="/dashboard">
          <img src="/logo.svg" alt="" />
        </a>
        <h1 className="font-bold text-xl text-white">{title}</h1>
      </MaxWithWrapper>
    </nav>
  );
}
