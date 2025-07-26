import React from 'react'
import achaarbanmob from '../../images/achaarbannermobile.png'
import achaarbandesktop from '../../images/achaarbannerdesktop.png'
function Acharr() {
  return (
    <>
             <div className="   w-full overflow-hidden">
               <img
                 src={achaarbandesktop}
                 alt="Hero Banner"
                 className="hidden lg:block w-full h-full object-cover"
               />
               <div className="h-auto mt-2 w-full overflow-hidden">
                 <img
                   src={achaarbanmob}
                   alt="Hero Banner"
                   className="block lg:hidden w-full h-full object-cover"
                 />
               </div>
             </div>
           </>
  )
}

export default Acharr