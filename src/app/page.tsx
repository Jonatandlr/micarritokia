"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const [state, setState] = React.useState(0);
  const router = useRouter();
  const redirect = () => {
    router.push("/dashboard");
  };
  redirect();
  return (
    <main className=" h-s">
      {/* loading */}
      <div className="flex justify-center items-center h-full">
        <div className="text-3xl">Loading...</div>
      </div>
    </main>
  );
}
