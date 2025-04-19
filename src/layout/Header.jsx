import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import routesConstants from "@/routes/routesConstants";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useDispatch, useSelector } from "react-redux";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LockResetIcon from "@mui/icons-material/LockReset";
import { getLogout } from "@/modules/login/slice/loginSlice";

const Header = ({ isOpen, setIsOpen, isMobileView, setIsMobileView }) => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userDetail } = useSelector((state) => state?.login);

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(getLogout());
  };

  // Handle Toogle Menu
  const handleToogleMenu = () => {};
  console.log(userDetail);
  return (
    <header className="header_block">
      <div className="header_content">
        <div className="header_logo">
          <Link
            onClick={() => {
              setIsOpen(!isOpen);
              setIsMobileView(false);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </Link>
        </div>
        <div className="header_right d-flex">
          <div className="profile_dropdown">
            <NotificationsNoneIcon className="me-2 notification-icon" />
            <button className="profile_icon" onClick={toggleProfileDropdown}>
              👤
            </button>
            {isProfileDropdownOpen && (
              <div className="dropdown_menu">
                <button
                  className="dropdown_item logout"
                  onClick={() =>
                    navigate(routesConstants.PROFILE + `/${userDetail?.id}`)
                  }
                >
                  <span className="logout_icon">
                    <ManageAccountsIcon />
                  </span>
                  <span className="logout_text">Profile</span>
                </button>
                <button
                  className="dropdown_item logout"
                  onClick={() => navigate(routesConstants.CHANGE_PASSWORD)}
                >
                  <span className="logout_icon">
                    <LockResetIcon />
                  </span>
                  <span className="logout_text">Change Password</span>
                </button>
                <button className="dropdown_item logout" onClick={handleLogout}>
                  <span className="logout_icon">🚪</span>
                  <span className="logout_text">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
