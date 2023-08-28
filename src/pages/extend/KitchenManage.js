import React, { useEffect, useRef, useState } from "react";
import Search from "../../components/search/Search";
import StaffInfo from "../../components/StaffInfo";
import styles from "../../css/KitchenInfo.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import KitchenInfo from "../../components/KitchenInfo";
import { url, localUrl } from "../../config/api";

export default function KitchenManage() {
  const navigate = useNavigate();
  const [kitchenData, setKitchenData] = useState([]);
  const kitchenCodeRef = useRef(null);
  const kitchenNameRef = useRef(null);
  const kitchenLocationRef = useRef(null);
  const searchInputRef = useRef(null);
  const [displayedData, setDisplayedData] = useState([]);
  const [searchApiCalled, setSearchApiCalled] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const token = localStorage.getItem("token");

  const getKitchenApi = async (page) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const queryParams = new URLSearchParams({
      page: currentPage - 1, // Trang bắt đầu từ 0
      size: recordsPerPage,
      sort: "kitchenCode",
      order: "ASC",
    });

    var raw = JSON.stringify({});

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/kitchen/management/search?${queryParams.toString()}`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data?.content;
      setKitchenData(data);
      setTotalRecords(result?.data?.totalElements);
      console.log(result);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getkitchenSearchApi = async (page) => {
    setSearchApiCalled(true);
    var myHeaders = new Headers();
    myHeaders.append("Origin", `${localUrl}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const queryParams = new URLSearchParams({});

    var raw = JSON.stringify({
      kitchenCode: searchInputRef?.current?.value,
      name: searchInputRef?.current?.value,
      // location: kitchenLocationRef?.current?.value,
      // searchValue: searchValue,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/kitchen/management/search`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data?.content;
      const startIndex = (currentPage - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      const slicedData = data.slice(startIndex, endIndex);

      setKitchenData(slicedData);
      setDisplayedData(slicedData);
      setTotalRecords(result?.data?.totalElements);
      console.log(result);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (searchApiCalled) {
      getkitchenSearchApi(currentPage);
    } else {
      getKitchenApi(currentPage);
    }
  }, [currentPage, searchApiCalled]);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const goToDetail = (code) => {
    navigate("/kitchenDetail/" + code);
    console.log("code", code);
  };

  const goToCreateKitchen = () => {
    navigate("/createKitchen");
  };

  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };
  console.log("currentPage", currentPage);

  const [hoverTextPosition, setHoverTextPosition] = useState({ x: 0, y: 0 });
  const [showHoverText, setShowHoverText] = useState(false);
  const handleMouseEnter = (e) => {
    setShowHoverText(true);
  };
  const handleMouseLeave = () => {
    setShowHoverText(false);
  };

  const handleMouseMove = (e) => {
    const offsetX = 20;
    const offsetY = 20;

    setHoverTextPosition({
      x: e.clientX + offsetX,
      y: e.clientY + offsetY,
    });
  };

  return (
    <div className="content">
      <div className="header-kitchen">
        <div className="header_kitchen_left">
          <div
            className="back-button-header"
            style={{ paddingLeft: "3px" }}
            onClick={() => {
              handleBackClick();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="searchContainer">
            <i>
              <FontAwesomeIcon icon={faSearch} className="searchIcon" />
            </i>
            <input
              ref={searchInputRef}
              className="inputSearch"
              type="text"
              placeholder="Tìm kiếm..."
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  getkitchenSearchApi(currentPage);
                }
              }}
              onInput={(event) => {
                const inputValue = event.target.value;
                if (inputValue.trim() === "") {
                  getKitchenApi(currentPage);
                }
              }}
            />
          </div>
          {/* <input
            type="text"
            className="header_kitchen_search-input"
            placeholder="Search Data"
          /> */}
        </div>
        <div className="header_kitchen_center">
          <span>Quản lý bếp</span>
        </div>
        <div className="header_kitchen_right">
          <button
            className="header_kitchen_create-button"
            onClick={() => {
              goToCreateKitchen();
            }}
          >
            Tạo
          </button>
        </div>
      </div>

      <div className="content-kitchen">
        <div className={styles.staffInfo}>
          {kitchenData?.map((item, index) => (
            <div className={styles.infoBox}>
              <h4
                className={styles.titleInfo}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onClick={() => goToDetail(item?.kitchenCode)}
              >
                {item?.kitchenCode}
              </h4>
              {showHoverText && (
                <span
                  className={styles.hoverText}
                  style={{
                    position: "fixed",
                    top: hoverTextPosition.y,
                    left: hoverTextPosition.x,
                  }}
                >
                  Xem chi tiết
                </span>
              )}
              <table>
                <tbody>
                  <tr>
                    <th>Tên bếp:</th>
                    <td>{item?.name}</td>
                  </tr>
                  <tr>
                    <th>Địa chỉ:</th>
                    <td>{item?.location}</td>
                  </tr>
                </tbody>
              </table>
              {/* <div
                className={styles.btnDetail}
                onClick={() => goToDetail(item?.kitchenCode)}
              >
                <button>Xem chi tiết</button>
              </div> */}
            </div>
          ))}
        </div>
        <div className="pagination">
          {currentPage != 1 && (
            <div
              className="back-button-header"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          )}
          <span className="">{currentPage}</span>

          {currentPage * recordsPerPage < totalRecords && (
            <div
              className="back-button-header"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
