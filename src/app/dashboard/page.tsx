import NavBar from '@/components/NavBar'
import React from 'react'
import NOSE from '@/components/TableDefects'
import TableSearch from '@/components/TableSearch/TableSearch'

export default function page() {
  return (
    <section>
      <NavBar title='Dashboard'/>
      <TableSearch/>

    </section>
  )
}
