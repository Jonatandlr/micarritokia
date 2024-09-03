import React from "react";

interface InfoReportProps {
  idReport: string;
}

export default async function InfoReport({ idReport }: InfoReportProps) {
  const res = await fetch(`http://localhost:3000/api/reporte/${idReport}`);
  const reportJson = await res.json();

  console.log(reportJson);

  return <div>hola</div>;
}
