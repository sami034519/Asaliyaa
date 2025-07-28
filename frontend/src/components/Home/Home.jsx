import React from 'react'
import homebanner from "../../images/mainbannerdesktop.webp"
import mobilemainbanner from '../../images/mainbannermob2.png'
function Home() {
  return (
    <>
    <div className="  w-full overflow-hidden">
  <img
    src={homebanner}
    alt="Hero Banner"
    className="hidden lg:block w-full h-full object-cover"
  />
  <div className="h-auto mt-2 w-full overflow-hidden">
  <img
    src={mobilemainbanner}
    alt="Hero Banner"
    className="block lg:hidden w-full h-full object-cover"
  />
</div>

</div>

        </>
  )
}

export default Home