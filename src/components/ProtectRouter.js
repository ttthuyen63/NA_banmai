import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/userSlice";
import axios from "axios";
import { urlAdmin } from "../config/api";

export default function ProtectRouter(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);
  // const tokenExpiration = useSelector(
  //   (state) => state.userReducer.tokenExpiration
  // );
  const refreshToken = sessionStorage.getItem("refreshToken");
  const accessToken = sessionStorage.getItem("accessToken");
  console.log("refreshToken", refreshToken);

  useEffect(() => {
    const getRefreshToken = async () => {
      const refreshToken = sessionStorage.getItem("refreshToken");
      const accessToken = sessionStorage.getItem("accessToken");

      const config = {
        method: "GET",
        url: `${urlAdmin}/authentication/authenticated/refresh-token`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          refreshToken: `Bearer ${refreshToken}`,
        },
      };

      try {
        const response = await axios(config);
        const result = response.data;
        console.log("Response", result);

        const newAccessToken = result?.data?.data?.tokens?.accessToken;
        const newRefreshToken = result?.data?.data?.tokens?.refreshToken;

        if (newAccessToken) {
          dispatch(login(newAccessToken));
          // Lưu lại accessToken mới vào sessionStorage
          sessionStorage.setItem("accessToken", newAccessToken);
          sessionStorage.setItem("refreshToken", newRefreshToken);
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Lỗi khi làm mới token:", error);
        dispatch(logout());
      }
    };

    // if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
    //   getRefreshToken();
    // }

    const refreshInterval = 60 * 60 * 1000; // 1 tiếng
    const refreshTimer = setInterval(getRefreshToken, refreshInterval);

    return () => {
      clearInterval(refreshTimer);
    };
  }, [refreshToken, dispatch]);
  return token !== null ? (
    props.children
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
