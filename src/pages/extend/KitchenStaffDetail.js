import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../css/KitchenStaffInfo.module.css";
import KitchenStaffInfo from "../../components/KitchenStaffInfo";
import { url } from "../../config/api";
import Options from "../../components/Options";

export default function KitchenStaffDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const kitchenCode = params.kitchenCode;
  const [kitchenStaffData, setKitchenStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const token = localStorage.getItem("token");

  const getKitchenStaffApi = async (page) => {
    var myHeaders = new Headers();
    myHeaders.append("kitchenCode", `${kitchenCode}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const queryParams = new URLSearchParams({
      page: currentPage - 1, // Trang bắt đầu từ 0
      size: recordsPerPage,
    });

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/personnel/management/search/search-by-kitchen-code?${queryParams.toString()}`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data?.content;
      setKitchenStaffData(data);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  console.log("kitchenStaffData", kitchenStaffData);

  useEffect(() => {
    getKitchenStaffApi(currentPage);
  }, [currentPage]);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const handleBackClick = () => {
    // navigate("/kitchenDetail");
    navigate(-1);
  };
  const goToDetail = (code) => {
    navigate("/staffDetail/" + code);
    console.log("code", code);
  };
  return (
    <div>
      <div className="header-kitchen-staff">
        <div className="header_kitchen-staff_left">
          <button
            className="header_kitchen-staff_back-button"
            onClick={() => {
              handleBackClick();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div className="header_kitchen-staff_center">
          Danh sách nhân viên bếp
        </div>
        <div className="header_kitchen-staff_right">
          <div className="header_kitchen-staff_kitchen-code">Mã bếp</div>
          <div className="header_kitchen-staff_kitchen-code">{kitchenCode}</div>
        </div>
      </div>
      <div className={styles.staffInfo}>
        {kitchenStaffData?.map((item, index) => (
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
                  {/* <td>{item?.part}</td> */}
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
            currentPage * recordsPerPage >= kitchenStaffData.length
              ? "disabled"
              : ""
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}
