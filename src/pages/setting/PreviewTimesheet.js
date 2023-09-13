import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PreviewTimesheet() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="detail-header">
        <div className="back-button-header" onClick={handleBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="title-header">Xem trước bảng chấm công bếp</div>
        <div>
          <button
            className="header_kitchen_create-button"
            onClick={() => {
              //   goToCreateKitchen();
            }}
          >
            Tinh chỉnh
          </button>
        </div>
      </div>
      <table className="timesheet">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã nhân viên</th>
            <th scope="col">Họ tên</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Ngày làm</th>
            <th scope="col">Người chấm</th>
            <th scope="col">Mã bếp</th>
            <th scope="col">Giờ vào</th>
            <th scope="col">Giờ tan</th>
            <th scope="col">Hệ số</th>
            <th scope="col">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tbody>
      </table>
    </div>
  );
}
