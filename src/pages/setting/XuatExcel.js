import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/ExportExcel.module.css";

export default function XuatExcel() {
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };
  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="detail-header">
        <div className="back-button-header" onClick={handleBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="title-header">Xuất file Excel</div>
      </div>
      <div className={styles.kitchenAttendance}>
        <div className={styles.ExcelContentTitle}>Xuất bảng chấm công bếp</div>
        <div className={styles.dateToDate}>
          <div className={styles.dateFrom}>
            <label>Từ ngày:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={handleDateFromChange}
            />
          </div>
          <div className={styles.dateTo}>
            <label>Đến ngày:</label>
            <input type="date" value={dateTo} onChange={handleDateToChange} />
          </div>
        </div>
        <div className={styles.ExcelBtn}>
          <button>Xem trước</button>
          <button>Tải xuống</button>
        </div>
      </div>
      <div className={styles.attendance}>
        <div className={styles.ExcelContentTitle}>Xuất bảng chấm công</div>
        <div className={styles.dateToDate}>
          <div className={styles.dateFrom}>
            <label>Từ ngày:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={handleDateFromChange}
            />
          </div>
          <div className={styles.dateTo}>
            <label>Đến ngày:</label>
            <input type="date" value={dateTo} onChange={handleDateToChange} />
          </div>
        </div>
        <div className={styles.ExcelBtn}>
          <button>Xem trước</button>
          <button>Tải xuống</button>
        </div>
      </div>
    </div>
  );
}
