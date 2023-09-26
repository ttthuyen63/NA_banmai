import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../components/axiosInstance";
import { url } from "../../config/api";
import FormatDate from "../../components/FormatDate";
import FormatBoolean from "../../components/Format";
import Format from "../../components/Format";

export default function Timesheets() {
  const navigate = useNavigate();
  const params = useParams();
  const kitchenCode = params.kitchenCode;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showConfirm, setshowConfirm] = useState(false);
  const [showDetail, setshowDetail] = useState(false);
  const [timesheetKitchenData, settimesheetKitchenData] = useState([]);
  const [timesheetDetailData, settimesheetDetailData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chooseDateRef = useRef();
  const [chooseDate, setchooseDate] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const fromDateRef = useRef();
  const toDateRef = useRef();
  const recordsPerPage = 10;
  const token = sessionStorage.getItem("token");
  // useEffect(() => {
  //   getTimesheetApi();
  // }, [chooseDate]);

  useEffect(() => {
    if (isInitialLoad) {
      const currentDate = new Date().toISOString().split("T")[0];
      setchooseDate(currentDate);
      setIsInitialLoad(false);
    }
    getTimesheetApi();
  }, [chooseDate]);

  const getTimesheetApi = async () => {
    const config = {
      headers: {
        kitchenCode: kitchenCode,
        Authorization: `Bearer ${token}`,
      },
    };

    const queryParams = new URLSearchParams({
      page: currentPage - 1, // Trang bắt đầu từ 0
      size: recordsPerPage,
    });

    const dataToSend = {
      fromValue: chooseDate,
      toValue: chooseDate,
    };

    try {
      const response = await axiosInstance.post(
        `${url}/timesheet/management/view/view-by-kitchen-code?${queryParams.toString()}`,
        dataToSend,
        config
      );

      const result = response?.data;
      const data = result?.data?.content;
      settimesheetKitchenData(data);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("choosedate", chooseDate);
  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };

  const handleClickDetail = async (code) => {
    const config = {
      headers: {
        personnelCode: code,
        Authorization: `Bearer ${token}`,
      },
    };

    const queryParams = new URLSearchParams({
      page: currentPage - 1, // Trang bắt đầu từ 0
      size: recordsPerPage,
    });

    const dataToSend = {
      fromValue: chooseDate,
      toValue: chooseDate,
    };

    try {
      const response = await axiosInstance.post(
        `${url}/timesheet/management/view/view-by-personnel-code?${queryParams.toString()}`,
        dataToSend,
        config
      );

      const result = response?.data;
      const data = result?.data?.content;
      settimesheetDetailData(data);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
    setshowDetail(true);
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    console.log("Handle Approve button clicked");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const dataToSend = {
      approveType: "APPROVE",
      timesheetRawIds: selectedIds,
    };

    try {
      const response = await axiosInstance.post(
        `${url}/timesheet/management/kitchen/timesheet/approve`,
        dataToSend,
        config
      );

      const result = response?.data;
      // const data = result?.data?.content;
      settimesheetKitchenData(result);
      getTimesheetApi();
      setshowConfirm(false);
      console.log(result);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleClose = () => {
    setshowConfirm(false);
    setshowDetail(false);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleHeaderCheckboxChange = () => {
    setIsHeaderCheckboxChecked(!isHeaderCheckboxChecked);
    const updatedTimesheetKitchenData = timesheetKitchenData.map((item) => ({
      ...item,
      isChecked: !isHeaderCheckboxChecked,
    }));
    settimesheetKitchenData(updatedTimesheetKitchenData);
  };

  const handleCheckboxChange = (itemId) => {
    const checkbox = document.querySelector(`input[data-id="${itemId}"]`);
    const id = checkbox.getAttribute("data-id");

    if (selectedIds.includes(id)) {
      const updatedSelectedIds = selectedIds?.filter(
        (selectedId) => selectedId !== id
      );
      setSelectedIds(updatedSelectedIds);
    } else {
      setSelectedIds([...selectedIds, id]);
    }

    const updatedTimesheetKitchenData = timesheetKitchenData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });
    settimesheetKitchenData(updatedTimesheetKitchenData);
  };

  console.log("selectedIds", selectedIds);
  return (
    <div className="content">
      <Modal show={showConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>XÁC NHẬN</Modal.Title>
        </Modal.Header>
        <Modal.Body className="row">
          <div>Bạn muốn duyệt thông tin chấm công?</div>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="button"
            style={{
              backgroundColor: "#baeaff",
              border: "none",
              color: "black",
            }}
            onClick={handleApprove}
            // onClick={handleSubmit}
            // }
          >
            Đồng ý
          </Button>
          <Button
            style={{
              backgroundColor: "#ffbacf",
              border: "none",
              color: "black",
            }}
            onClick={handleClose}
          >
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetail} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Thông tin chấm công</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="row" style={{ margin: "0px 20px" }}>
          <h5 style={{ textAlign: "center" }}>
            Mã nhân viên: {timesheetDetailData[0]?.personnelCode}
          </h5>
          <div className="col-sm-6">
            <table
              className="timesheets-detail-table"
              style={{ position: "relative" }}
            >
              <tbody>
                <tr>
                  <th>Họ và tên:</th>
                  <td>scfsdv</td>
                </tr>
                <tr>
                  <th>Hệ số lương:</th>
                  <td>{timesheetDetailData[0]?.coefficients}</td>
                </tr>
                <tr>
                  <th>Họp tại công ty:</th>
                  <Format boolean={timesheetDetailData[0]?.joinMeetCompany} />
                </tr>

                <tr>
                  <th>Giao cơm:</th>
                  <Format boolean={timesheetDetailData[0]?.riceDelivery} />
                </tr>
                <tr>
                  <th>Bếp được hỗ trợ:</th>
                  <td>{timesheetDetailData[0]?.kitchenCodeSupported}</td>
                </tr>
                <tr>
                  <th>Tình trạng:</th>
                  <td>
                    <Format
                      approveStatus={timesheetDetailData[0]?.approveStatus}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-6">
            <table
              className="timesheets-detail-table"
              style={{ position: "relative" }}
            >
              <tbody>
                <tr>
                  <th>Ngày:</th>
                  <td>{timesheetDetailData[0]?.date}</td>
                </tr>
                <tr>
                  <th>Giờ vào:</th>
                  <td>{timesheetDetailData[0]?.startTime?.slice(0, 8)}</td>
                </tr>
                <tr>
                  <th>Giờ ra:</th>
                  <td>{timesheetDetailData[0]?.endTime?.slice(0, 8)}</td>
                </tr>
                <tr>
                  <th>Ghi chú:</th>
                  <td>{timesheetDetailData[0]?.note}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn-confirm"
            style={{ height: "40px", width: "80px" }}
            onClick={() => {
              setshowConfirm(true);
            }}
          >
            <FontAwesomeIcon icon={faCheck} /> Duyệt
          </button>
          <button
            className="btn-refuse"
            style={{ height: "40px", width: "80px" }}
          >
            <FontAwesomeIcon icon={faTimes} /> Từ chối
          </button>
        </Modal.Footer>
      </Modal>

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
          Thông tin chấm công nhân viên
        </div>
        <div className="header_kitchen-staff_right">
          <div className="header_kitchen-staff_kitchen-code">{kitchenCode}</div>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div
          className="content-timesheets"
          style={{ backgroundColor: "#eeeeec" }}
        >
          <div className="timesheets-detail">
            <div className="timesheets-detail-left">
              <div
                className={`sidebar-timesheets ${
                  activeTab === "all" ? "active" : ""
                }`}
                onClick={() => handleTabClick("all")}
              >
                Tất cả
              </div>
              <div
                className={`sidebar-timesheets ${
                  activeTab === "pending" ? "active" : ""
                }`}
                onClick={() => handleTabClick("pending")}
              >
                Chờ duyệt
              </div>
              <div
                className={`sidebar-timesheets ${
                  activeTab === "approved" ? "active" : ""
                }`}
                onClick={() => handleTabClick("approved")}
              >
                Đã duyệt
              </div>
              <div
                className={`sidebar-timesheets ${
                  activeTab === "rejected" ? "active" : ""
                }`}
                onClick={() => handleTabClick("rejected")}
              >
                Bị từ chối
              </div>
            </div>

            <div className="timesheets-detail-right">
              <div className="timesheets-header">
                <div className="chooseDate">
                  <input
                    type="date"
                    ref={chooseDateRef}
                    value={chooseDate}
                    onChange={(e) => setchooseDate(e.target.value)}
                  />
                </div>
                <div className="confirmContainer">
                  <button
                    className="btn-confirm"
                    style={{ height: "40px", width: "80px" }}
                    onClick={() => {
                      setshowConfirm(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} /> Duyệt
                  </button>

                  <button
                    className="btn-refuse"
                    style={{ height: "40px", width: "80px" }}
                  >
                    <FontAwesomeIcon icon={faTimes} /> Từ chối
                  </button>
                </div>
              </div>
              <div className="table-timesheets">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={isHeaderCheckboxChecked}
                          onChange={handleHeaderCheckboxChange}
                        ></input>
                      </th>
                      <th>Mã nhân viên</th>
                      <th>Họ và tên</th>
                      <th>Ngày làm việc</th>
                      <th>Thời gian chấm công</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timesheetKitchenData?.length > 0 ? (
                      timesheetKitchenData
                        .filter((item) => {
                          if (activeTab === "pending") {
                            return item.approveStatus === "PENDING";
                          } else if (activeTab === "approved") {
                            return item.approveStatus === "APPROVE";
                          } else if (activeTab === "rejected") {
                            return item.approveStatus === "REJECT";
                          } else {
                            return true;
                          }
                        })
                        ?.map((item, index) => (
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                checked={item.isChecked || false}
                                onChange={() => handleCheckboxChange(item.id)}
                                data-id={item.id}
                              ></input>
                            </td>
                            <td>{item?.personnelCode}</td>
                            <td
                              onClick={() => {
                                handleClickDetail(item?.personnelCode);
                              }}
                            >
                              Họ và tên
                            </td>
                            <td>
                              <FormatDate date={item?.date} />
                            </td>
                            <td>
                              {item?.startTime?.slice(0, 8)} {" - "}
                              {item?.endTime?.slice(0, 8)}
                            </td>
                            <td>
                              {/* <div className="timesheets-status">Chờ duyệt</div> */}
                              <Format approveStatus={item?.approveStatus} />
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="6">Không có dữ liệu</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                {currentPage != 1 && (
                  <div
                    className="previous-page-button"
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
                    className="after-page-button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
