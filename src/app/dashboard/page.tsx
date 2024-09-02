"use client"
import NavBar from "@/components/NavBar";
import React, { useEffect, useState } from "react";
import TableSearch from "@/components/TableSearch/TableSearch";

export default function page() {
  const [defects, setDefects] = useState([]);

  useEffect(() => {
    const fetchDefects = async () => {
      const res = await fetch("http://localhost:3000/api/form");
      const defectsJson = await res.json();
      console.log(defectsJson.defects[0]); // Verifica que todos los datos estén aquí.
      setDefects(defectsJson.defects); // Asegúrate de que el estado esté siendo actualizado correctamente.

    };
    fetchDefects();
  }, []);

  return (
    <section>
      <NavBar title="Dashboard" />
      <TableSearch defects={defects}/>
    </section>
  );
}
