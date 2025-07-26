import React from 'react'
import herbalteadesk from '../../images/herbalteabannerdesktop.png'
import herbalteabannermob from '../../images/herbalteabannermobile.png'
function HerbalTea() {
  return (
    <>
             <div className="    w-full overflow-hidden">
               <img
                 src={herbalteadesk}
                 alt="Hero Banner"
                 className="hidden lg:block w-full h-full object-cover"
               />
               <div className="h-auto mt-2 w-full overflow-hidden">
                 <img
                   src={herbalteabannermob}
                   alt="Hero Banner"
                   className="block lg:hidden w-full h-full object-cover"
                 />
               </div>
             </div>
           </>
  )
}

export default HerbalTea