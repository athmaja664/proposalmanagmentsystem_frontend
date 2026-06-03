import React from 'react'

function Preloader() {
  return (
    <div className="flex items-start justify-center h-screen bg-white">
      <img 
        src="https://cdn-icons-gif.flaticon.com/19036/19036900.gif" 
        alt="Loading..." 
        className="w-40 h-40 mt-80"
      />
    </div>
  )
}

export default Preloader
