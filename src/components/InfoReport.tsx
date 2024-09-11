"use client";
import React, { use, useEffect } from "react";
import QRCode from "react-qr-code";

interface InfoReportProps {
  idReport: string;
}

interface Report {
  id: string;
  VIN: string;
  Ubicacion: string;
  ReportedDate: string;
  Notes: string;
  Model: string;
  Issue: string;
  DetectedBy: string;
  Color: string;
  AreaResponsible: string;
  Status: string;
  requestor: string;
}
const dataTime = (date: string) => {
  const dateReport = new Date(date);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - dateReport.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function InfoReport({ idReport }: InfoReportProps) {
  const [report, setReport] = React.useState<Report>();
  const [time, setTime] = React.useState<number>(0);

  const fetchData = async () => {
    // console.log(idReport);
    const res = await fetch(`http://localhost:3000/api/reporte/${idReport}`);
    const data = await res.json();
    // console.log(data);
    // console.log(data.defectReport.ReportedDate);
    setTime(dataTime(data.defectReport.ReportedDate));

    setReport(data.defectReport);
  };

  useEffect(() => {
    fetchData();
    // if (report)
    //   console.log(dataTime(report.ReportedDate));
  }, []);

  // console.log(reportJson);

  return (
    <div>
      {report ? (
        <div className="border border-black rounded-lg py-5 px-10">
          <div className="flex flex-row justify-evenly gap-2">
            <div className="w-1/2">
              <div>
                <h3 className="font-semibold">VIN</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.VIN}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Modelo</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.Model}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Ubicacion</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.Ubicacion}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Fecha del Reporte</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.ReportedDate}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Tiempo del defecto</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {time} dias
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Color</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.Color}
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <div>
                <h3 className="font-semibold">Reportado por</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.DetectedBy}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Responsable de Area</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.AreaResponsible}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Solicitante</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.requestor}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Problema</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.Issue}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Estado</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.Status}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Notas</h3>
                <div className="mt-1 p-2 block w-full  border border-gray-300 rounded-md">
                  {report.Notes}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white py-3 px-9 rounded-md flex flex-col items-center">
            <h1 className="text-lg font-bold">Codigo Creado</h1>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "20%", width: "20%" }}
              value={report.id}
              viewBox={`0 0 256 256`}
            />
            <div>
              <button
                onClick={() => {}}
                className="w-full py-2 mt-4 px-4 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700"
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
