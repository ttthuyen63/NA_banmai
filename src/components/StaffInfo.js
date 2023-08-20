import React from "react";
import styles from "../css/Staff.module.css";

function StaffInfo({ title, fullName, birthDate, parts, position }) {
  return (
    <div className={styles.infoBox}>
      <h4 className="info-title">{title}</h4>
      <table>
        <tbody>
          <tr>
            <th>Họ tên:</th>
            <td>{fullName}</td>
          </tr>
          <tr>
            <th>Ngày sinh:</th>
            <td>{birthDate}</td>
          </tr>
          <tr>
            <th>Bộ phận:</th>
            <td>{parts}</td>
          </tr>
          <tr>
            <th>Chức vụ:</th>
            <td>{position}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StaffInfo;
