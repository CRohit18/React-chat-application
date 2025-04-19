import { navLinks } from "@/constants/ConstantConfig";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip, Zoom } from "@mui/material";
import { Trisita_Logo } from "@/constants/images";
import { GrClose } from "react-icons/gr";

const Sidebar = ({ isOpen, setIsOpen, isMobileView, setIsMobileView }) => {
  const location = useLocation();
  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsOpen(false); // close the sidebar
      } else {
        setIsOpen(true); // open the sidebar on wider screens
      }
    };

    // Call once on mount
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  const handleItemClick = (navigate) => {
    if (window.innerWidth < 769) {
      setIsMobileView(true);
    }
    console.log(navigate);
  };
  return (
    <>
      <div
        className={`sidebar-container ${
          isOpen ? "sidebar-open" : "sidebar-closed"
        } ${isMobileView ? "d-none" : "d-block"}`}
      >
        <div className="trisita_logo mb-4">
          <img src={Trisita_Logo} alt="Logo" />
          <div className="gr-close">
            <GrClose size={20} onClick={() => setIsMobileView(true)} />
          </div>
        </div>
        <nav className="menuItems_list">
          <ul>
            {navLinks?.map((link) =>
              link?.isLabel ? (
                <>
                  <h4 key={link?.name} className="mb-3 mt-4">
                    {link?.name}
                  </h4>
                  {link?.item?.map((item) => (
                    <li
                      key={item?.itemName}
                      onClick={() => handleItemClick(item?.href)}
                      className="mb-3"
                    >
                      <Tooltip
                        title={item?.itemName}
                        arrow
                        TransitionComponent={Zoom}
                        placement="right"
                        disableHoverListener={isOpen}
                        key={item?.itemName}
                      >
                        <Link to={item?.href} key={item?.itemName} className={`${location.pathname === item?.href && "active-link"}`}>
                          {item?.iconUrl && item?.iconUrl}
                          <span className="menu-item-text" key={item?.itemName}>
                            {item?.itemName}
                          </span>
                        </Link>
                      </Tooltip>
                    </li>
                  ))}
                </>
              ) : (
                <li
                  key={link?.name}
                  onClick={() => handleItemClick(link?.href)}
                  className="mb-3"
                >
                  <Tooltip
                    title={link?.name}
                    arrow
                    TransitionComponent={Zoom}
                    placement="right"
                    disableHoverListener={isOpen}
                    key={link?.name}
                  >
                    <Link to={link?.href} key={link?.name} className={`${location.pathname === link?.href && "active-link"}`}>
                      {link?.iconUrl && link?.iconUrl}
                      <span className="menu-item-text" key={link?.name}>
                        {link?.name}
                      </span>
                    </Link>
                  </Tooltip>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
