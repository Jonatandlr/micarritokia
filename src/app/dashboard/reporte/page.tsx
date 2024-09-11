import React from "react";
import NavBar from "../../../components/NavBar";
import MyForm from "@/components/MyForm";
import MaxWithWrapper from "@/components/MaxWidthWrapper";

export default function Page() {
  return (
    <div>
      <NavBar title="Reporte de Vehiculo" />
      <MaxWithWrapper>
        <div className="pt-10 px-3 flex flex-col w-full">
          <div >
            <h1 className="font-bold text-2xl">Reporte de Defecto</h1>
            <p className="pt-1text-lg max-w-xs opacity-80">
              Llena los campos de abajo para reportar el defecto de la unidad
            </p>
          </div>

          <MyForm />
        </div>
      </MaxWithWrapper>
    </div>
  );
}
