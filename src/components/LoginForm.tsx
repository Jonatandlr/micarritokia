"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn} from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormValues {
  idEmployee: string;
  password: string;
}

const validationSchema = Yup.object({
  idEmployee: Yup.string()
    .matches(
      /^E[A-Z0-9]{6}$/,
      'El ID debe tener 7 caracteres y comenzar con "E"'
    )
    .required("El ID es obligatorio"),
  password: Yup.string().required("Contraseña es requerida"),
});

export default function LoginForm() {

  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const formik = useFormik<FormValues>({
    initialValues: {
      idEmployee: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const res=await signIn("credentials", {
        username: values.idEmployee,
        password: values.password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
        return;
      }else{
        router.push("/dashboard");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" text-white p-4 px-8 w-full flex flex-col items-center"
    >
      <div className="mb-4 block w-full">
        <label htmlFor="idEmployee" className="block text-md font-bold pb-2">
          ID de empleado
        </label>
        <input
          type="text"
          id="idEmployee"
          name="idEmployee"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.idEmployee}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-black"
          placeholder="Ejemplo: E1234567"
        />
        {formik.touched.idEmployee && formik.errors.idEmployee ? (
          <div className="text-sm mt-1">
            {formik.errors.idEmployee}
          </div>
        ) : null}
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="password" className="block text-md font-bold">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-black"
          placeholder="Ingresa tu contraseña"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-sm mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </div>
      {error && <div className="text-red-100">{error}</div>}
      <button
        type="submit"
        className="bg-white text-black font-semibold rounded-md p-2 w-1/2"
      >
        Iniciar sesión &rarr;
      </button>
    </form>
  );
}
