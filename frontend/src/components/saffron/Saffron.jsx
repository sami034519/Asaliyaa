import React from 'react'
import saffrondesktop from '../../images/saffrondesk.png'
import saffronmob from '../../images/saffronbannermob.png'
function Saffron() {
  return (
        <>
            <div className="  w-full overflow-hidden">
          <img
            src={saffrondesktop}
            alt="Hero Banner"
            className="hidden lg:block w-full h-full object-cover"
          />
          <div className="h-auto mt-2 w-full overflow-hidden">
          <img
            src={saffronmob}
            alt="Hero Banner"
            className="block lg:hidden w-full h-full object-cover"
          />
        </div>
        
        </div>
        
                </>
  )
}

export default Saffron