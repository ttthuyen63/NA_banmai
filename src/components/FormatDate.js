import React from "react";

const FormatDate = (props) => {
  const { date } = props;

  const parts = date.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  } else {
    return date; // Trả về nguyên bản nếu không phải là định dạng "năm-tháng-ngày".
  }
};
export default FormatDate;
