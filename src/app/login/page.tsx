import React from "react";
import LoginForm from "@/components/LoginForm";
import MaxWithWrapper from "@/components/MaxWidthWrapper";
export default function page() {
  //page of login
  return (
    <main className="h-screen w-full bg-rose-600 flex flex-col justify-center items-center `">
      <MaxWithWrapper className="flex justify-center items-center  flex-col md:flex-row">
        <img src="/logo.svg" alt="" className="w-1/2 " />
        <LoginForm />
      </MaxWithWrapper>
    </main>
  );
}
