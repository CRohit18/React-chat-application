import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(window?.innerWidth >= 1200);
  const [isMobileView, setIsMobileView] = useState();
 // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 769) {
        setIsMobileView(true); // close the sidebar
      } else {
        setIsMobileView(false); // open the sidebar on wider screens
      }
    };

    // Call once on mount
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileView]);
  return (
    <div className="w-100 d-flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isMobileView={isMobileView} setIsMobileView ={setIsMobileView}/>
      <div className="main-content">
        <Header setIsOpen={setIsOpen} isOpen={isOpen} isMobileView={isMobileView} setIsMobileView ={setIsMobileView}/>
        <div className="content p-4">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
