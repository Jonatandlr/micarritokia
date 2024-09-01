"use client";
import React, { useState, useMemo } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  Column,
  TableInstance,
} from "react-table";
import ReactPaginate from "react-paginate";

// Tipos para los datos de la tabla
interface Data {
  col1: string;
  col2: string;
}

// Propiedades del filtro global
interface GlobalFilterProps {
  preGlobalFilteredRows: any;
  globalFilter: string;
  setGlobalFilter: (filterValue: string | undefined) => void;
}

// Componente de filtro global para la barra de búsqueda
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: GlobalFilterProps) {
  const count = preGlobalFilteredRows.length;

  return (
    <div className="mb-4">
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder={`Buscar en ${count} registros...`}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// Tipos para las propiedades del componente de la tabla
interface TableWithPaginationProps {
  columns: Column<Data>[];
  data: Data[];
}

const TableWithPagination: React.FC<TableWithPaginationProps> = ({
  columns,
  data,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Página actual
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, globalFilter },
    setPageSize,
    previousPage,
    nextPage,
    setGlobalFilter,
    preGlobalFilteredRows,
  }: TableInstance<Data> = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Página inicial y tamaño de página
    },
    useGlobalFilter, // Filtro global para la búsqueda
    usePagination // Uso de paginación
  );

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <div className="mt-4 flex justify-between items-center">
        <ReactPaginate
          onPageChange={({ selected }) => setPageSize(selected + 1)}
          pageCount={pageOptions.length}
          previousLabel={"< Anterior"}
          nextLabel={"Siguiente >"}
          breakLabel={"..."}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName={"pagination flex space-x-2"}
          pageClassName={"px-3 py-2 border rounded-md cursor-pointer"}
          activeClassName={"bg-blue-500 text-white"}
          disabledClassName={"text-gray-400 cursor-not-allowed"}
          forcePage={pageIndex}
        />
      </div>
    </>
  );
};

export default function NOSE() {
  // Datos de ejemplo
  const data: Data[] = useMemo(
    () => [
      { col1: "Hola", col2: "Mundo" },
      { col1: "Prueba", col2: "Tabla" },
      { col1: "React", col2: "Es Genial" },
      { col1: "Componente", col2: "Con Pag." },
      // Agrega más datos aquí...
    ],
    []
  );

  // Definición de columnas
  const columns: Column<Data>[] = useMemo(
    () => [
      { Header: "Columna 1", accessor: "col1" }, // accessor es el "key" en los datos
      { Header: "Columna 2", accessor: "col2" },
    ],
    []
  );

  return (
    <div className="container mx-auto p-4">
      <TableWithPagination columns={columns} data={data} />
    </div>
  );
}
