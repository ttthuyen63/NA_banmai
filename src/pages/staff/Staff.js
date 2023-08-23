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
  faChevronLeft,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Options from "../../components/Options";

export default function Staff() {
  const navigate = useNavigate();
  const [personnelData, setpersonnelData] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const personnelCodeRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const token = localStorage.getItem("token");
  const data = {
    parts: [
      { key: "KITCHEN", value: "Bếp" },
      { key: "HR", value: "Human Resources" },
      { key: "MANAGEMENT", value: "Hành chính" },
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
      setpersonnelData(data);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // useEffect(() => {
  //   getpersonnelSearchApi(currentPage);
  // }, [currentPage]);

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
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getpersonnelApi(currentPage);
  }, [currentPage]);

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

  return (
    <>
      <div className="row">
        <div className="col-sm-2">
          <Sidebar />
        </div>

        <div className="col-sm-10">
          <div className="content">
            <div className="content-header">
              <div className="search">
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
                    ref={personnelCodeRef}
                    className="inputSearch"
                    type="text"
                    placeholder="Tìm kiếm..."
                    onKeyPress={() => {
                      getpersonnelSearchApi();
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
                  {/* <FontAwesomeIcon icon={faPlus} /> */}
                </div>
              </div>
            </div>
            <div className="content">
              {showAdvancedSearch && (
                <div className="advanced-search">
                  <div>
                    <select>
                      <option value="">Bộ phận</option>
                    </select>
                  </div>

                  <br />
                  <div>
                    <select>
                      <option value="">Chức vụ</option>
                      {/* Điền tùy chọn chức vụ ở đây */}
                    </select>
                  </div>
                </div>
              )}
              <div className={styles.staffInfo}>
                {personnelData?.map((item, index) => (
                  <div className={styles.infoBox}>
                    {/* <div> */}
                    <h4
                      className={styles.titleInfo}
                      onClick={() => goToDetail(item?.personnelCode)}
                    >
                      {item?.personnelCode}
                    </h4>
                    {/* <button
                        className={styles.btnDetail}
                        onClick={() => goToDetail(item?.personnelCode)}
                      >
                        Xem chi tiết
                      </button>
                    </div> */}
                    <table>
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
                          {/* <td>{item?.part}</td> */}
                        </tr>
                        <tr>
                          <th>Chức vụ:</th>
                          <td>
                            <Options position={item?.position} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* <div
                      className={styles.btnDetail}
                      onClick={() => goToDetail(item?.personnelCode)}
                    >
                      <button>Xem chi tiết</button>
                    </div> */}
                  </div>
                ))}
              </div>
              <div className="pagination">
                <div
                  className={`back-button-header ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <span className="">{currentPage}</span>

                <div
                  className={`back-button-header ${
                    currentPage * recordsPerPage >= personnelData.length
                      ? "disabled"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
