import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCogs,
  faGear,
  faPencilSquare,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const sidebarNavItems = [
  //   {
  //     display: "Tài khoản",
  //     // icon: <i className="bx bx-home"></i>,
  //     to: "/",
  //     section: "",
  //   },
  {
    display: "Nhân viên",
    // icon: <i className="bx bx-star"></i>,
    to: "/",
    section: "staff",
  },
  {
    display: "Mở rộng",
    // icon: <i className="bx bx-calendar"></i>,
    to: "/extend",
    section: "extend",
  },
  {
    display: "Cài đặt",
    icon: <i className="bx bx-cog"></i>,
    to: "/setting",
    section: "setting",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      //     indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      //     setStepHeight(sidebarItem.clientHeight);
      //   }, 50);
      // }, []);
      const preferencesItem = sidebarRef.current.querySelector(
        ".sidebar__preferences"
      );

      if (sidebarItem && preferencesItem) {
        const indicatorPosition =
          sidebarItem.clientHeight * activeIndex +
          preferencesItem.clientHeight / 2; // Điều chỉnh vị trí indicator
        indicatorRef.current.style.transform = `translateY(${indicatorPosition}px)`;
        setStepHeight(sidebarItem.clientHeight);
      }
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-container">
          <div className="sidebar__selector">MAIN MENU</div>

          <div ref={sidebarRef} className="sidebar__menu">
            <div
              ref={indicatorRef}
              className="sidebar__menu__indicator"
              style={{
                transform: `
                translateX(-50%) 
                translateY(${activeIndex * stepHeight}px)`,
              }}
            ></div>
            {sidebarNavItems
              .slice(0, sidebarNavItems.length - 1)
              .map((item, index) => (
                <Link to={item.to} key={index}>
                  <div
                    className={`sidebar__menu__item ${
                      activeIndex === index ? "active" : ""
                    }`}
                  >
                    <div className="sidebar__menu__item__icon">{item.icon}</div>
                    <div className="sidebar__menu__item__text">
                      {item.display}
                    </div>
                  </div>
                </Link>
              ))}
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="sidebar-container">
        <div className="sidebar__selector">PREFERENCES</div>
        {sidebarNavItems.slice(-1).map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === sidebarNavItems.length - 1 ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">
                <FontAwesomeIcon icon={faGear} />
              </div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
      <div
        className="btn-logout"
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span>Thoát tài khoản</span>
      </div>
    </nav>
  );
};

export default Sidebar;
