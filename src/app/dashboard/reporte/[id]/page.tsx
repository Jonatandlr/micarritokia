"use client";
import NavBar from "@/components/NavBar";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MaxWithWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import InfoReport from "@/components/InfoReport";
import PenSVG from "@/components/PenSVG";
export default function page() {
  const params = useParams<{ id: string }>();
  // console.log(params);

  return (
    <section>
      <NavBar title={`Reporte`} />

      <MaxWithWrapper>
        <div className="flex flex-col pt-10 pb-5">
          <h1 className="font-bold text-primary md:text-4xl text-3xl pb-5">Ficha Reporte</h1>
          <div className="flex justify-between">
            <Link href={`${process.env.NEXT_PUBLIC_URL}/dashboard`}
           className="bg-primary font-semibold text-base px-2 rounded-md text-white flex items-center gap-1 ">Regresar</Link>
            <button  className="bg-primary font-semibold text-base px-2 rounded-md text-white flex items-center gap-1 ">
              <PenSVG />
              Modificar
            </button>
          </div>
        </div>
        <div>
          <InfoReport idReport={params.id}/>
        </div>
      </MaxWithWrapper>
    </section>
  );
}
