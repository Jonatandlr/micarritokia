import React from "react";
import LoginForm from "@/components/LoginForm";
export default function page() {
  //page of login
  return (
    <main className="h-screen w-full bg-rose-600 flex flex-col justify-center items-center `">
      <img src="/logo.svg" alt="" className="w-1/2" />
      <LoginForm />
    </main>
  );
}
