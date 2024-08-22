import React from 'react'
import NavBar from '../../../components/NavBar'
import MyForm from '@/components/MyForm'

export default function page() {
  return (
    <div>
        <NavBar title='Reporte de Vehiculo' />
        <div className='pt-5 px-3'>
            <div>
                <h1 className='font-bold text-2xl'>Reporte de Defecto</h1>
                <p className='pt-4 text-lg max-w-xs opacity-80'>Llena los campos de abajo para reportar
                el defecto de la unidad</p>
            </div>
            <MyForm />

        </div>
    </div>
  )
}
