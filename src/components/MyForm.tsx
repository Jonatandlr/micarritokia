"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToggleButton from "./ToggleButton";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

interface FormValues {
  serialNumber: string;
  model: string;
  color: string;
  AreaResponsible: string;
  Requestor: string;
  issue: string;
  Notes: string;
}

const colorOptions = ["Negro", "Gris", "Blanco", "Azul", "Rojo", "NA"];

const validationSchema = Yup.object({
  serialNumber: Yup.string().required("Numero de serie es requerido"),
  model: Yup.string().required("El modelo es requerido"),
  color: Yup.string().required(
    "Color es requerido (poner NA en caso de que no tenga)"
  ),

  AreaResponsible: Yup.string().required(
    "El responsable del area es requerido"
  ),
  Requestor: Yup.string().required("El solicitante del area es requerido"),
  issue: Yup.string()
    .max(50, `Maximo ${50} caracteres permitido`)
    .required("Descripcion es requerida")
    .min(10, `Minimo ${10} caracteres`),
  Notes: Yup.string()
    .max(50, `Maximo ${50} caracteres permitido`)
    .min(10, `Minimo ${10} caracteres`),
});

export default function MyForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [qrCreated, setQrCreated] = useState(false);
  const [idQr,setIdQr]=useState("")

  const formik = useFormik<FormValues>({
    initialValues: {
      serialNumber: "",
      model: "",
      color: "",
      AreaResponsible: "",
      Requestor: "",
      issue: "",
      Notes: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.message === "Formulario enviado") {
        // router.push("/dashboard");
        setLoading(false);
        setQrCreated(true);
        setIdQr(data.id)
      } else {
        setLoading(false);
        alert("Error al enviar el formulario");
      }
    },
  });

  return (
    <div>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md">
            <h1 className="text-lg font-bold">Enviando...</h1>
          </div>
        </div>
      ) : (
        <div>
          {qrCreated ? (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white py-3 px-9 rounded-md ">
                <h1 className="text-lg font-bold">Codigo Creado</h1>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={idQr}
                  viewBox={`0 0 256 256`}
                />
                <div>
                  <button
                    onClick={() => {
                      setQrCreated(false);
                      router.push("/dashboard");
                    }}
                    className="w-full py-2 mt-4 px-4 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700"
                  >
                    Regresar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form
              onSubmit={formik.handleSubmit}
              className=" py-3 bg-white flex flex-col md:flex-row md:gap-5"
            >
              <div className="md:w-1/2">
                <div className="mb-4">
                  <label
                    htmlFor="serialNumber"
                    className="block text-md font-bold"
                  >
                    Numero de Serie (VIN)
                  </label>
                  <input
                    type="text"
                    id="serialNumber"
                    name="serialNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.serialNumber}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    placeholder="Coloca el # de serie de la unidad"
                  />
                  {formik.touched.serialNumber && formik.errors.serialNumber ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.serialNumber}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label htmlFor="model" className="block text-md font-bold">
                    Modelo
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.model}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    placeholder="Coloca el modelo de la unidad"
                  />
                  {formik.touched.model && formik.errors.model ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.model}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label className="block text-md font-bold">Color</label>
                  <div className="flex flex-wrap gap-3 ">
                    <ToggleButton
                      opcions={colorOptions}
                      onOptionSelect={(option) =>
                        formik.setFieldValue("color", option)
                      }
                    />
                  </div>
                  {formik.touched.color && formik.errors.color ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.color}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="AreaResponsible"
                    className="block text-md font-bold"
                  >
                    Responsable de Area
                  </label>
                  <input
                    type="text"
                    id="AreaResponsible"
                    name="AreaResponsible"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.AreaResponsible}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    placeholder="Coloca el responsable del area"
                  />
                  {formik.touched.AreaResponsible &&
                  formik.errors.AreaResponsible ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.AreaResponsible}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="Requestor"
                    className="block text-md font-bold"
                  >
                    Solicitante
                  </label>
                  <input
                    type="text"
                    id="Requestor"
                    name="Requestor"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Requestor}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    placeholder="Coloca el solicitante"
                  />
                  {formik.touched.Requestor && formik.errors.Requestor ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.Requestor}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="mb-4">
                  <label htmlFor="issue" className="block text-md font-bold">
                    Descripcion del problema
                  </label>
                  <textarea
                    id="issue"
                    name="issue"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.issue}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Describe el problema de la unidad"
                  />
                  {formik.touched.issue && formik.errors.issue ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.issue}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label htmlFor="Notes" className="block text-md font-bold">
                    Notas
                  </label>
                  <textarea
                    id="Notes"
                    name="Notes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Notes}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Describe el problema de la unidad"
                  />
                  {formik.touched.Notes && formik.errors.Notes ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.Notes}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 mb-4 px-4 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700"
                >
                  Submit
                </button>
                <a
                  href="/dashboard"
                  className="flex w-full items-center justify-center py-2 px-4  border-2 border-black border-opacity-30 bg-white hover:bg-rose-600 text-black hover:text-white font-medium rounded-md transition-all duration-300"
                >
                  Cancel
                </a>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
