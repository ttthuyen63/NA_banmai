import React from "react";
import axios from "axios";

// export default function Constant() {
//   const getToken = async () => {
//     try {
//       const response = await axios.post(
//         "100.82.237.81:8888/banmai/api/v1/authentication/login"
//       );
//       console.log("response", response);
//       const token = response.data.token;
//       return token;
//     } catch (error) {
//       console.error("Lỗi khi lấy token:", error);
//       throw error;
//     }
//   };
//   return <div>C</div>;
// }

export const currencyFormat = (num) => {
  if (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "đ";
  }
  return "";
};
