'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  serialNumber: string;
  color: string;
  reporter: string;
  description: string;
}

const colorOptions = ['Negro', 'Gris', 'Blanco', 'Azul', 'Rojo', "NA"];

const validationSchema = Yup.object({
  serialNumber: Yup.string().required('Serial number is required'),
  color: Yup.string().required('Color is required'),
  reporter: Yup.string().required('Reporter name is required'),
  description: Yup.string().max(15, `Maximum ${15} characters allowed`).required('Description is required')
});

export default function MyForm () {
  const formik = useFormik<FormValues>({
    initialValues: {
      serialNumber: '',
      color: '',
      reporter: '',
      description: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert( values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md py-3 bg-white">
      <div className="mb-4">
        <label htmlFor="serialNumber" className="block text-md font-bold">
          Numero de Serie
        </label>
        <input
          type="text"
          id="serialNumber"
          name="serialNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.serialNumber}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          placeholder='Coloca el # de serie de la unidad'
        />
        {formik.touched.serialNumber && formik.errors.serialNumber ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.serialNumber}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block text-md font-bold">Color</label>
        <div className="flex space-x-4 mt-2">
          {colorOptions.map((color) => (
            <label key={color} className="flex items-center space-x-2">
              <input
                type="radio"
                name="color"
                value={color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.color === color}
                className="form-radio text-indigo-600"
              />
              <span>{color}</span>
            </label>
          ))}
        </div>
        {formik.touched.color && formik.errors.color ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.color}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="reporter" className="block text-md font-bold">
          Reportado por
        </label>
        <input
          type="text"
          id="reporter"
          name="reporter"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.reporter}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          placeholder='Nombre del reportador'
        />
        {formik.touched.reporter && formik.errors.reporter ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.reporter}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-md font-bold">
          Descripcion del problema
        </label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          rows={4}
          placeholder='Describe el problema de la unidad'
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.description}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-800"
      >
        Submit
      </button>
    </form>
  );
};


