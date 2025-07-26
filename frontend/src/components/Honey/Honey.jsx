import React from 'react'
import mainbannerdek from '../../images/honeyBanner.png'
import mainbannermob from '../../images/honeybannermob.png'
function Honey() {
  return (
    <>
        <div className="  w-full overflow-hidden">
      <img
        src={mainbannerdek}
        alt="Hero Banner"
        className="hidden lg:block w-full h-full object-cover"
      />
      <div className="h-auto mt-2 w-full overflow-hidden">
      <img
        src={mainbannermob}
        alt="Hero Banner"
        className="block lg:hidden w-full h-full object-cover"
      />
    </div>
    
    </div>
    
            </>
  )
}

export default Honey