import React from 'react'
import massagedesk from '../../images/massageBannerdesktop.png'
import massagemob from '../../images/massagebannermobile.png'
function Massage() {
  return (
   <>
               <div className="   w-full overflow-hidden">
             <img
               src={massagedesk}
               alt="Hero Banner"
               className="hidden lg:block w-full h-full object-cover"
             />
             <div className="h-auto mt-2 w-full overflow-hidden">
             <img
               src={massagemob}
               alt="Hero Banner"
               className="block lg:hidden w-full h-full object-cover"
             />
           </div>
           
           </div>
           
                   </>
  )
}

export default Massage