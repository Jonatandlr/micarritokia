"use client";
import React, { useState } from "react";
import MaxWithWrapper from "../MaxWidthWrapper";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";
import defectos from "@/libs/MOCK_DATA.json";

type Reporte = {
  Model: string;
  VIN: string;
  Color: string | null;
  DetectBy: string;
  FechaDeReporte: string;
  LineOutDate: string;
  Problem: string | null;
  AreaProblem: string | null;
  Solicitante: string;
  Ubicacion: string | null;
  Notes: string | null;
};
const columnHelper = createColumnHelper<Reporte>();

const columns = [
  columnHelper.accessor("Model", {
    header: "Modelo",
  }),
  columnHelper.accessor("VIN", {
    header: "VIN",
  }),
  columnHelper.accessor("Color", {
    header: "Color",
  }),
  columnHelper.accessor("DetectBy", {
    header: "Detectado por",
  }),
  columnHelper.accessor("FechaDeReporte", {
    header: "Fecha de reporte",
  }),
  columnHelper.accessor("LineOutDate", {
    header: "Fecha de salida",
  }),
  columnHelper.accessor("Problem", {
    header: "Problema",
  }),
  columnHelper.accessor("AreaProblem", {
    header: "Área del problema",
  }),
  columnHelper.accessor("Solicitante", {
    header: "Solicitante",
  }),
  columnHelper.accessor("Ubicacion", {
    header: "Ubicación",
  }),
  columnHelper.accessor("Notes", {
    header: "Notas",
  }),
];

export default function TableSearch() {
  const [data, setData] = useState<Reporte[]>(defectos);
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel<Reporte>(),
    getPaginationRowModel: getPaginationRowModel<Reporte>(),
    getSortedRowModel: getSortedRowModel<Reporte>(),
    getFilteredRowModel: getFilteredRowModel<Reporte>(),
    state: {
      sorting,
      globalFilter: search,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
  });
  return (
    <MaxWithWrapper className="pt-20">
      <input type="text" name="" id="" placeholder="no se " 
        className=" border-red-500 border-2 rounded-lg w-full px-4 py-1" 
        value={search}
        onChange={(e)=>{setSearch(e.target.value)} }/>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    key={column.id}
                    className=""
                    onClick={column.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      column.column.columnDef.header,
                      column.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[column.column.getIsSorted() as string] ?? null}
            
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </MaxWithWrapper>
  );
}
