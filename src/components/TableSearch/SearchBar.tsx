import React from 'react'

export default function SearchBar() {
    

  return (
    <div>
        <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        
    </div>
  )
}
