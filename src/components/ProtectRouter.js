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
  const tokenExpiration = useSelector(
    (state) => state.userReducer.tokenExpiration
  );
  const refreshToken = sessionStorage.getItem("refreshToken");
  const accessToken = sessionStorage.getItem("accessToken");
  console.log("refreshToken", refreshToken);

  useEffect(() => {
    const getRefreshToken = async () => {
      var myHeaders = new Headers();
      myHeaders.append("refreshToken", `Bearer ${refreshToken}`);
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      try {
        // const response = await axios.get(
        //   `${urlAdmin}/authentication/authenticated/refresh-token`,
        //   {
        //     headers: {
        //       refreshToken: `Bearer ${refreshToken}`,
        //       Authorization: `Bearer ${accessToken}`,
        //     },
        //   }
        // );
        const response = await fetch(
          `${urlAdmin}/authentication/authenticated/refresh-token`,
          requestOptions
        );

        const result = await response.json();
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

    if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
      getRefreshToken();
    }

    const refreshInterval = 60 * 60 * 1000; // 1 tiếng
    const refreshTimer = setInterval(getRefreshToken, refreshInterval);

    return () => {
      clearInterval(refreshTimer);
    };
  }, [tokenExpiration, refreshToken, dispatch]);
  return token !== null ? (
    props.children
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
