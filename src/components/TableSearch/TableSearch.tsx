"use client";
import React, { useEffect, useState } from "react";
import MaxWithWrapper from "../MaxWidthWrapper";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnSort,
} from "@tanstack/react-table";
import defectos from "@/libs/MOCK_DATA.json";
import Link from "next/link";

type Reporte = {
  id: string;
  Model: string;
  VIN: string;
  Color: string | null;
  DetectedBy: string;
  ReportedDate: string;
  // LineOutDate: string;
  Issue: string | null;
  AreaResponsible: string | null;
  requestor: string;
  Ubicacion: string | null;
  Status: string;
  Notes: string | null;
};
const columnHelper = createColumnHelper<Reporte>();

const columns = [
  columnHelper.accessor("VIN", {
    header: "VIN",
    cell: (cell) => {
      // console.log(cell.row.original.id);
      return (
        <Link href={`${process.env.NEXT_PUBLIC_URL}/dashboard/reporte/${cell.row.original.id}`}
        className="hover:underline transition-all duration-300 hover:scale-125">
          {cell.row.original.VIN}
        </Link>
      );
    },
  }),
  columnHelper.accessor("Model", {
    header: "Modelo",
  }),
  columnHelper.accessor("Color", {
    header: "Color",
  }),
  columnHelper.accessor("DetectedBy", {
    header: "Detectado por",
  }),
  columnHelper.accessor("ReportedDate", {
    header: "Fecha de reporte",
  }),
  // columnHelper.accessor("LineOutDate", {
  //   header: "Fecha de salida",
  // }),
  columnHelper.accessor("Issue", {
    header: "Problema",
  }),
  columnHelper.accessor("AreaResponsible", {
    header: "Área del problema",
  }),
  columnHelper.accessor("requestor", {
    header: "Solicitante",
  }),
  columnHelper.accessor("Ubicacion", {
    header: "Ubicación",
  }),
  columnHelper.accessor("Status", {
    header: "Status",
  }),
  columnHelper.accessor("Notes", {
    header: "Notas",
  }),
];

export default function TableSearch({ defects }: { defects: Reporte[] }) {
  const [data, setData] = useState(defects);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setData(defects);
    // console.log(defects);
  }, [defects]);

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
    <MaxWithWrapper className="py-10">
      <div className="rounded-lg flex w-full  mb-10 ">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search..."
          className="border-2 w-full rounded-lg p-1"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="bg-primary px-4 rounded-lg hover:cursor-pointer">
          <svg
            width="37"
            height="39"
            viewBox="0 0 37 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.2167 34.125L20.5042 23.8875C19.7333 24.5375 18.8469 25.0521 17.8448 25.4313C16.8427 25.8104 15.7764 26 14.6458 26C11.8451 26 9.47483 24.9776 7.5349 22.9328C5.59497 20.888 4.625 18.3896 4.625 15.4375C4.625 12.4854 5.59497 9.98698 7.5349 7.94219C9.47483 5.8974 11.8451 4.875 14.6458 4.875C17.4465 4.875 19.8168 5.8974 21.7568 7.94219C23.6967 9.98698 24.6667 12.4854 24.6667 15.4375C24.6667 16.6292 24.4868 17.7531 24.1271 18.8094C23.7674 19.8656 23.2792 20.8 22.6625 21.6125L32.375 31.85L30.2167 34.125ZM14.6458 22.75C16.5729 22.75 18.2109 22.0391 19.5599 20.6172C20.9089 19.1953 21.5833 17.4688 21.5833 15.4375C21.5833 13.4062 20.9089 11.6797 19.5599 10.2578C18.2109 8.83594 16.5729 8.125 14.6458 8.125C12.7188 8.125 11.0807 8.83594 9.73177 10.2578C8.38281 11.6797 7.70833 13.4062 7.70833 15.4375C7.70833 17.4688 8.38281 19.1953 9.73177 20.6172C11.0807 22.0391 12.7188 22.75 14.6458 22.75Z"
              fill="#FEF7FF"
            />
          </svg>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center gap-2 mb-4">
          <div>
            <h1 className="text-2xl font-bold">Tabla de defectos</h1>
          </div>
          <div className="group">
            <Link
              href="/dashboard/reporte"
              className="bg-primary px-4 py-1 rounded-lg text-white flex justify-center items-center gap-2 group-hover:bg-white transition-all duration-300 group-hover:text-primary group-hover:border-primary border-2 border-primary"
            >
              <span>
                <svg
                  width="24"
                  height="20"
                  viewBox="0 0 24 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8333 15H13.1666V11H17.8333V9H13.1666V5H10.8333V9H6.16659V11H10.8333V15ZM11.9999 20C10.386 20 8.86936 19.7417 7.44992 19.225C6.03047 18.6917 4.79575 17.975 3.74575 17.075C2.69575 16.175 1.85964 15.1167 1.23742 13.9C0.634641 12.6833 0.333252 11.3833 0.333252 10C0.333252 8.61667 0.634641 7.31667 1.23742 6.1C1.85964 4.88333 2.69575 3.825 3.74575 2.925C4.79575 2.025 6.03047 1.31667 7.44992 0.799999C8.86936 0.266666 10.386 0 11.9999 0C13.6138 0 15.1305 0.266666 16.5499 0.799999C17.9694 1.31667 19.2041 2.025 20.2541 2.925C21.3041 3.825 22.1305 4.88333 22.7333 6.1C23.3555 7.31667 23.6666 8.61667 23.6666 10C23.6666 11.3833 23.3555 12.6833 22.7333 13.9C22.1305 15.1167 21.3041 16.175 20.2541 17.075C19.2041 17.975 17.9694 18.6917 16.5499 19.225C15.1305 19.7417 13.6138 20 11.9999 20ZM11.9999 18C14.6055 18 16.8124 17.225 18.6208 15.675C20.4291 14.125 21.3333 12.2333 21.3333 10C21.3333 7.76667 20.4291 5.875 18.6208 4.325C16.8124 2.775 14.6055 2 11.9999 2C9.39436 2 7.18742 2.775 5.37908 4.325C3.57075 5.875 2.66659 7.76667 2.66659 10C2.66659 12.2333 3.57075 14.125 5.37908 15.675C7.18742 17.225 9.39436 18 11.9999 18Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Agregar Reporte
            </Link>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center">No hay datos</div>
      ) : (
        <div>
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                        key={column.id}
                        className="border-2 border-primary"
                        onClick={column.column.getToggleSortingHandler()}
                      >
                        <div className="flex flex-row px-3 font-semibold text-[14px]  justify-between items-center gap-2">
                          {flexRender(
                            column.column.columnDef.header,
                            column.getContext()
                          )}
                          {{
                            asc: (
                              <svg
                                width="20"
                                height="12"
                                viewBox="0 0 20 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10 12L0 0L20 0L10 12Z" fill="black" />
                              </svg>
                            ),
                            desc: (
                              <svg
                                width="20"
                                height="12"
                                viewBox="0 0 20 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10 0L20 12H0L10 0Z" fill="black" />
                              </svg>
                            ),
                          }[column.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="text-[13px] border-2 border-rose-600">
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 == 0 ? " bg-rose-400 text-white" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => {
                    // console.log(cell.column.columnDef.header);

                    // if
                    return (
                      <td key={cell.id} className="px-2 ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
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
        </div>
      )}
    </MaxWithWrapper>
  );
}
