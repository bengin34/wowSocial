import React from "react";
import { ThreeDots } from "react-loading-icons";

const Loader = () => {
  return (
    <div className="flex-center w-4   ">
      <ThreeDots stroke="#1c2c94" strokeOpacity={0.125} speed={0.4} />
    </div>
  );
};

export default Loader;
