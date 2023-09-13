import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Timesheets() {
  const navigate = useNavigate();
  const params = useParams();
  const kitchenCode = params.kitchenCode;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownDate, setShowDropdownDate] = useState(false);
  const fromDateRef = useRef();
  const toDateRef = useRef();
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
          {/* <div className="chooseDate">
            <input type="date" ref={fromDateRef} />
            <span>{" -> "}</span>
            <input type="date" ref={toDateRef} />
          </div> */}
          {/* {showDropdown ? (
            <div className="dropdown">
            
              <button onClick={() => setShowDropdownDate(!showDropdownDate)}>
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
            <div className="chooseDateDropdown">
              <input type="date" ref={fromDateRef} />
              <span>{" -> "}</span>
              <input type="date" ref={toDateRef} />
            </div>
          )} */}
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
            <button className="btn-detail-attendance">Xem thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
}
