import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoResults = ({message}) => {
    const navigate = useNavigate()
  return (
     <div className="flex h-[91vh] items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-500 px-4">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No connections"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Connections Found</h2>
        <p className="text-gray-600">
          {message}
        </p>
        <button
          className="mt-6 px-4 py-2 bg-amber-500 text-white rounded-lg shadow hover:bg-amber-600 transition duration-200"
          onClick={() => navigate('/feed')}
        >
          Find Connections
        </button>
      </div>
    </div>
  )
}

export default NoResults