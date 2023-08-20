import React, { useEffect, useState } from "react";
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
import { url } from "../../config/api";

export default function KitchenManage() {
  const navigate = useNavigate();
  const [kitchenData, setKitchenData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const token = localStorage.getItem("token");

  const getKitchenApi = async (page) => {
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
        `${url}/kitchen/management/search?${queryParams.toString()}`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data?.content;
      setKitchenData(data);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getKitchenApi(currentPage);
  }, [currentPage]);

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
    navigate("/extend");
    console.log("Back button clicked");
  };
  console.log("currentPage", currentPage);
  return (
    <div className="content">
      <div className="header-kitchen">
        <div className="header_kitchen_left">
          <div
            className="back-button-header"
            onClick={() => {
              handleBackClick();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <input
            type="text"
            className="header_kitchen_search-input"
            placeholder="Search Data"
          />
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
              <h4 className="info-title">{item?.kitchenCode}</h4>
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
              <div
                className={styles.btnDetail}
                onClick={() => goToDetail(item?.kitchenCode)}
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
              currentPage * recordsPerPage >= kitchenData.length
                ? "disabled"
                : ""
            }`}
            // disabled={currentPage * recordsPerPage >= kitchenData.length}
            // disabled={endIndex >= kitchenData.length}
            // className="back-button-header"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
}
