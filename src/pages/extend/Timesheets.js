import {
  faChevronLeft,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function Timesheets() {
  const navigate = useNavigate();
  const params = useParams();
  const kitchenCode = params.kitchenCode;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDetail, setshowDetail] = useState(false);

  const [showDropdownDate, setShowDropdownDate] = useState(false);
  const fromDateRef = useRef();
  const toDateRef = useRef();
  const recordsPerPage = 15;
  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1650) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
        setShowDropdownDate(false);
      }
    };

    // Thêm sự kiện lắng nghe sự thay đổi kích thước của cửa sổ
    window.addEventListener("resize", handleResize);

    // Kiểm tra ban đầu khi component được tạo
    handleResize();

    // Loại bỏ sự kiện lắng nghe khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickDetail = () => {
    setshowDetail(true);
  };

  const handleClose = () => {
    setshowDetail(false);
  };

  return (
    <div className="content">
      <Modal show={showDetail} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#99c8fe", textAlign: "center" }}
        >
          <Modal.Title style={{ margin: "auto" }}>
            THÔNG TIN CHẤM CÔNG
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="row">
          <div className="col-sm-6">
            <h3>Nhanvien1</h3>
            <table className="timesheets-detail-table">
              <tbody>
                <tr>
                  <th>Họ và tên:</th>
                  <td>scfsdv</td>
                </tr>
                <tr>
                  <th>Hệ số lương:</th>
                  <td>1.0</td>
                </tr>
                <tr>
                  <th>Họp tại công ty:</th>
                  <td>Có</td>
                </tr>
                <tr>
                  <th>Hỗ trợ bếp:</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Giao cơm:</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Bếp được hỗ trợ:</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Tình trạng:</th>
                  <td>Chờ duyệt</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-6"></div>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              backgroundColor: "#baeaff",
              border: "none",
              color: "black",
            }}
            // onClick={() => handleDelete(item?.id)
            // onClick={handleSubmit}
            // }
          >
            Duyệt
          </Button>
          <Button
            style={{
              backgroundColor: "#ffbacf",
              border: "none",
              color: "black",
            }}
            onClick={handleClose}
          >
            Từ chối
          </Button>
        </Modal.Footer>
      </Modal>

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
          <div className="date-container" style={{ position: "relative" }}>
            {showDropdown ? (
              <div>
                <button
                  className="dropdown-timesheets"
                  onClick={() => setShowDropdownDate(!showDropdownDate)}
                >
                  Chọn thời gian
                </button>
              </div>
            ) : (
              <div className="chooseDate">
                <input type="date" ref={fromDateRef} />
                <span>{" -> "}</span>
                <input type="date" ref={toDateRef} />
              </div>
            )}
            {showDropdownDate && (
              <div
                className="chooseDateDropdown"
                // style={{ position: "fixed", top: "48px" }}
              >
                <input type="date" ref={fromDateRef} />
                <span>{" -> "}</span>
                <input type="date" ref={toDateRef} />
              </div>
            )}
          </div>
          <button
            className="btnSelect"
            // onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          >
            Tình trạng
          </button>
        </div>
        <div className="header_kitchen_center">
          <span>Bảng chấm công</span>
        </div>
        <div className="header_kitchen_right">
          {/* <button
            className="header_kitchen_create-button"
            onClick={() => {
              //   goToCreateKitchen();
            }}
          >
            Tạo
          </button> */}
          <div className="confirmContainer">
            <input type="checkbox" />
            <button className="btn-confirm">Duyệt</button>
            <button className="btn-refuse">Từ chối</button>
            {/* <div className="timesheets_kitchen-code">{kitchenCode}</div> */}
          </div>
          <div className="timesheets_kitchen-code">{kitchenCode}</div>
        </div>
      </div>
      <div className="content-timesheets">
        <div className="timesheets-detail">
          <div className="timesheets-info">
            <div className="detail-timesheets-header">
              <div className="detail-title">
                <input type="checkbox" />
                <h4>Nhanvien1</h4>
              </div>
              <div className="detail-attendance">Có mặt</div>
            </div>
            <table className="timesheets-table">
              <tbody>
                <tr>
                  <th style={{ textAlign: "center" }}>19-12-2020</th>
                  <td style={{ textAlign: "center" }}>08:00 {"->"} 15:00</td>
                </tr>
                <tr>
                  <th>Người chấm:</th>
                  <td>scfsdv</td>
                </tr>
                <tr>
                  <th>Hệ số lương:</th>
                  <td>1.0</td>
                </tr>
                <tr>
                  <th>Họp tại công ty:</th>
                  <td>Có</td>
                </tr>
                <tr>
                  <th>Hỗ trợ bếp:</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Giao cơm:</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Tình trạng:</th>
                  <td>Chờ duyệt</td>
                </tr>
              </tbody>
            </table>
            <div>
              <button
                className="btn-detail-attendance"
                onClick={(e) => {
                  e.preventDefault();
                  handleClickDetail();
                }}
              >
                Xem thêm
              </button>
            </div>
          </div>
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
  );
}
