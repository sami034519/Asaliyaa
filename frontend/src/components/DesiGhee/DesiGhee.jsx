import React from 'react'
import desibannermob from '../../images/desigheebannermobile.png'
import desibannerdexk from '../../images/desigheebannerdsktop.png'
function DesiGhee() {
  return (
    <>
             <div className="    w-full overflow-hidden">
               <img
                 src={desibannerdexk}
                 alt="Hero Banner"
                 className="hidden lg:block w-full h-full object-cover"
               />
               <div className="h-auto mt-2 w-full overflow-hidden">
                 <img
                   src={desibannermob}
                   alt="Hero Banner"
                   className="block lg:hidden w-full h-full object-cover"
                 />
               </div>
             </div>
           </>
  )
}

export default DesiGhee