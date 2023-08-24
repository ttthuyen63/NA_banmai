import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Search from "../../components/search/Search";
import StaffInfo from "../../components/StaffInfo";
import styles from "../../css/Staff.module.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { url, localUrl } from "../../config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronLeft,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Options from "../../components/Options";
import Select from "react-select";
import { Modal } from "react-bootstrap";

export default function Staff() {
  const navigate = useNavigate();
  const [personnelData, setpersonnelData] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const personnelCodeRef = useRef(null);
  const personnelNameRef = useRef(null);
  const selectedPartRef = useRef(null);
  const selectedPositionRef = useRef(null);
  const [searchApiCalled, setSearchApiCalled] = useState(false);
  const [filterApiCalled, setFilterApiCalled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const recordsPerPage = 6;
  const token = localStorage.getItem("token");
  const data = {
    parts: [
      { key: "KITCHEN", value: "Bếp" },
      { key: "HR", value: "Hành chính" },
      { key: "MANAGEMENT", value: "Quản lý" },
    ],
    positions: [
      { key: "PERSONNEL", value: "Nhân viên" },
      { key: "MANAGER", value: "Quản lý" },
    ],
  };

  const partOptions = data.parts.map((option) => ({
    label: option?.value,
    value: option?.key,
  }));

  const positionOptions = data.positions.map((option) => ({
    label: option.value,
    value: option.key,
  }));

  const [selectedPart, setSelectedPart] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const getpersonnelSearchApi = async (page) => {
    setSearchApiCalled(true);
    setFilterApiCalled(false);
    var myHeaders = new Headers();
    myHeaders.append("Origin", `${localUrl}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const queryParams = new URLSearchParams({
      // page: currentPage - 1, // Trang bắt đầu từ 0
      // size: recordsPerPage,
    });

    var raw = JSON.stringify({
      personnelCode: personnelCodeRef?.current?.value,
      name: personnelNameRef?.current?.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/personnel/management/search?${queryParams.toString()}`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data?.content;
      const startIndex = (currentPage - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      const slicedData = data.slice(startIndex, endIndex);

      setpersonnelData(slicedData);
      setDisplayedData(slicedData);
      setTotalRecords(result?.data?.totalElements);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getpersonnelFilterApi = async (page) => {
    setFilterApiCalled(true);
    setSearchApiCalled(false);
    var myHeaders = new Headers();
    myHeaders.append("Origin", `${localUrl}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const queryParams = new URLSearchParams({
      // page: currentPage - 1, // Trang bắt đầu từ 0
      // size: recordsPerPage,
    });

    var raw = JSON.stringify({
      part: selectedPart?.value,
      position: selectedPosition?.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/personnel/management/search?${queryParams.toString()}`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data?.content;
      const startIndex = (currentPage - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      const slicedData = data.slice(startIndex, endIndex);

      setpersonnelData(slicedData);
      setDisplayedData(slicedData);
      setTotalRecords(result?.data?.totalElements);
      setShowAdvancedSearch(false);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (searchApiCalled) {
      getpersonnelSearchApi(currentPage);
    } else if (filterApiCalled) {
      getpersonnelFilterApi(currentPage);
    } else {
      getpersonnelApi(currentPage);
    }
  }, [currentPage, searchApiCalled, filterApiCalled]);

  const getpersonnelApi = async (page) => {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", `${localUrl}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const queryParams = new URLSearchParams({
      page: currentPage - 1, // Trang bắt đầu từ 0
      size: recordsPerPage,
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
        `${url}/personnel/management/search?${queryParams.toString()}`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data?.content;
      setpersonnelData(data);
      setTotalRecords(result?.data?.totalElements);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  console.log("personnel", personnelData);
  const goToDetail = (code) => {
    navigate("/staffDetail/" + code);
    console.log("code", code);
  };
  const gotoCreateStaff = () => {
    navigate("/createStaff");
  };

  const handleDeleteFilter = () => {
    setShowAdvancedSearch(false);
    setSelectedPart(null);
    setSelectedPosition(null);
    setSearchApiCalled(false);
    setFilterApiCalled(false);
    getpersonnelApi(currentPage);
  };

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

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showSidebarDialog, setShowSidebarDialog] = useState(false);

  return (
    <>
      <div className="row">
        {sidebarVisible && (
          <div className="col-sm-2">
            <Sidebar />
          </div>
        )}
        <Modal
          show={showSidebarDialog}
          onHide={() => setShowSidebarDialog(false)}
          dialogClassName="sidebar-dialog"
          contentClassName="d-flex flex-column"
          style={{
            top: 0,
            left: 0,
            transform: "none",
            position: "fixed",
            margin: 0,
            width: "40%",
            height: "85%",
          }}
        >
          <Modal.Body className="p-0">
            <Sidebar />
          </Modal.Body>
        </Modal>

        <div
          className={sidebarVisible ? "content col-sm-10" : "content col-12"}
        >
          <div className="content-header">
            <div className="content-header">
              <div className="search">
                <button
                  className=" faBars"
                  onClick={() => {
                    setShowSidebarDialog(!showSidebarDialog);
                  }}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <button
                  className="btnSelect"
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                >
                  Nâng cao
                </button>

                <div className="searchContainer">
                  <i>
                    <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                  </i>
                  <input
                    ref={personnelCodeRef && personnelNameRef}
                    className="inputSearch"
                    type="text"
                    placeholder="Tìm kiếm..."
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        getpersonnelSearchApi(currentPage);
                      }
                    }}
                    onInput={(event) => {
                      const inputValue = event.target.value;
                      if (inputValue.trim() === "") {
                        getpersonnelApi(currentPage);
                      }
                    }}
                  />
                </div>

                <div
                  className="btnCreate"
                  onClick={() => {
                    gotoCreateStaff();
                  }}
                >
                  Thêm
                </div>
              </div>
            </div>
            <div className="content">
              {showAdvancedSearch && (
                <div className="advanced-search">
                  <div className="filter-part">
                    <Select
                      options={partOptions}
                      value={selectedPart}
                      ref={selectedPartRef}
                      placeholder="Bộ phận"
                      onChange={(selectedOption) => {
                        setSelectedPart(selectedOption);
                        selectedPartRef.current.value = selectedOption.value; // Cập nhật giá trị vào biến ref
                      }}
                    />
                  </div>

                  <br />
                  <div className="filter-position">
                    <Select
                      options={positionOptions}
                      value={selectedPosition}
                      ref={selectedPositionRef}
                      placeholder="Chức vụ"
                      onChange={(selectedOption) => {
                        setSelectedPosition(selectedOption);
                        selectedPositionRef.current.value =
                          selectedOption.value; // Cập nhật giá trị vào biến ref
                      }}
                    />
                  </div>
                  <div>
                    <button
                      className="ok-filter"
                      onClick={() => getpersonnelFilterApi(currentPage)}
                    >
                      OK
                    </button>
                    <button
                      className="delete-filter"
                      style={{ backgroundColor: "#ffbacf", color: "black" }}
                      onClick={() => handleDeleteFilter()}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              )}
              <div className={styles.staffInfo}>
                {personnelData?.map((item, index) => (
                  <div className={styles.infoBox}>
                    {/* <div> */}
                    <h4
                      className={styles.titleInfo}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                      onClick={() => goToDetail(item?.personnelCode)}
                    >
                      {item?.personnelCode}
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
                      <div>
                        <tbody>
                          <tr>
                            <th>Họ và tên:</th>
                            <td>{item?.fullName}</td>
                          </tr>
                          <tr>
                            <th>Ngày sinh:</th>
                            <td>{item?.birthDate}</td>
                          </tr>
                          <tr>
                            <th>Bộ phận:</th>
                            <td>
                              <Options part={item?.part} />
                            </td>
                          </tr>
                          <tr>
                            <th>Chức vụ:</th>
                            <td>
                              <Options position={item?.position} />
                            </td>
                          </tr>
                        </tbody>
                      </div>
                    </table>
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
        </div>
      </div>
    </>
  );
}
