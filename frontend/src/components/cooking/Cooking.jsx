import React from "react";
import cookdesktop from '../../images/cookingoilBANNERdesktop.png'
import cookmob from '../../images/cookBANNERmob.png'
function Cooking() {
  return (
    <>
      <div className="w-full overflow-hidden">
        <img
          src={cookdesktop}
          alt="Hero Banner"
          className="hidden lg:block w-full h-full object-cover"
        />
        <div className="h-auto mt-2 w-full overflow-hidden">
          <img
            src={cookmob}
            alt="Hero Banner"
            className="block lg:hidden w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Cooking;
