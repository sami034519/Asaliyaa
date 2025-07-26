import React from 'react'
import shilagitbannermob from '../../images/shilagitbannermobile.png'
import shilagitbannerdesk from '../../images/shilagitbannerdesktop.png'
function ShILAGIT() {
  return (
   <>
         <div className="w-full overflow-hidden">
           <img
             src={shilagitbannerdesk}
             alt="Hero Banner"
             className="hidden lg:block w-full h-full object-cover"
           />
           <div className="h-auto mt-2 w-full overflow-hidden">
             <img
               src={shilagitbannermob}
               alt="Hero Banner"
               className="block lg:hidden w-full h-full object-cover"
             />
           </div>
         </div>
       </>
  )
}

export default ShILAGIT