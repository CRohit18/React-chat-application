// import loading from "@/assets/images/gif/loader.gif";
// import { useSelector } from "react-redux";
// const PageLoader = () => {
//   const { pageLoader } = useSelector((state) => state.login);
//   return (
//     <div className={`loader ${pageLoader ? "show" : ""}`}>
//       <img src={loading} alt="Loading..." width={"60px"} />
//     </div>
//   );
// };
// export default PageLoader;

import React from "react";
import { useSelector } from "react-redux";

const PageLoader = () => {
  const { pageLoader } = useSelector((state) => state.login);
  return (
    <div className={`loader-overlay ${!pageLoader ? "hide-loader" : ""}`}>
      <div className="loader-wrapper">
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
};
export default PageLoader;
