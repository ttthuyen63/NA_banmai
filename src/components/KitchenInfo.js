import React from "react";
import styles from "../css/KitchenInfo.module.css";

export default function KitchenInfo({ title, kitchenName, kitchenAddress }) {
  return (
    <div className={styles.infoBox}>
      <h4 className="info-title">{title}</h4>
      <table>
        <tbody>
          <tr>
            <th>Tên bếp:</th>
            <td>{kitchenName}</td>
          </tr>
          <tr>
            <th>Địa chỉ:</th>
            <td>{kitchenAddress}</td>
          </tr>
        </tbody>
      </table>
      <button>Xem chi tiết</button>
    </div>
  );
}
