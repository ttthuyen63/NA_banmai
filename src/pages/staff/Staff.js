import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Search from "../../components/search/Search";
import StaffInfo from "../../components/StaffInfo";
import styles from "../../css/Staff.module.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { url } from "../../config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Staff() {
  const navigate = useNavigate();
  const [personnelData, setpersonnelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const token = localStorage.getItem("token");

  const getpersonnelApi = async (page) => {
    var myHeaders = new Headers();
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

  return (
    <div className="row">
      <div className="col-sm-2">
        <Sidebar />
      </div>

      <div className="col-sm-10">
        <div className="content">
          <div className="content-header">
            <Search />
          </div>
          <div className="content">
            <div className={styles.staffInfo}>
              {personnelData?.map((item, index) => (
                <div className={styles.infoBox}>
                  <h4 className="info-title">{item?.personnelCode}</h4>
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
                        <td>{item?.part}</td>
                      </tr>
                      <tr>
                        <th>Chức vụ:</th>
                        <td>{item?.position}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    className={styles.btnDetail}
                    onClick={() => goToDetail(item?.personnelCode)}
                  >
                    <button>Xem chi tiết</button>
                  </div>
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
  );
}
