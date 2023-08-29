import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "../css/Login.module.css";
import { login, loginAsync } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { urlAdmin } from "../config/api";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const token = useSelector((state) => state.userReducer.token);
  const [refreshToken, setRefreshToken] = useState(null);
  const submit = async () => {
    try {
      const res = await axios.post(
        `${urlAdmin}/authentication/login`,
        {
          username: username,
          password: password,
          // "Content-Type": "application/json",
          // returnSecureToken: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            username: username,
            password: password,
          },
        }
      );
      console.log("res", res);
      const accessToken = res?.data?.data?.tokens?.accessToken;
      const refreshToken = res?.data?.data?.tokens?.refreshToken;
      setRefreshToken(refreshToken);
      dispatch(login(accessToken));
      sessionStorage.setItem("refreshToken", refreshToken);

      navigate("/");
      console.log("refreshToken", refreshToken);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const storedRefreshToken = sessionStorage.getItem("refreshToken");
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);
  // useEffect(() => {
  //   if (token !== null) {
  //     navigate("/");
  //   } else if (refreshToken !== null) {
  //     // Check if the current API request was unauthorized (401)
  //     axios.interceptors.response.use(
  //       (response) => response,
  //       async (error) => {
  //         if (error.response && error.response.status === 403) {
  //           try {
  //             // Refresh the token using the refresh token
  //             const refreshResponse = await axios.get(
  //               `${urlAdmin}/authentication/authenticated/refresh-token`,
  //               {
  //                 refreshToken: `Bearer ${refreshToken}`,
  //               }
  //             );

  //             const newAccessToken =
  //               refreshResponse?.data?.data?.tokens?.accessToken;

  //             // Update the token in Redux store
  //             dispatch(login(newAccessToken));

  //             // Retry the original request with the new token
  //             error.config.headers.Authorization = `Bearer ${newAccessToken}`;
  //             return axios.request(error.config);
  //           } catch (refreshError) {
  //             setError(true); // Handle refresh error
  //             throw refreshError;
  //           }
  //         }
  //         throw error;
  //       }
  //     );
  //   }
  // }, [token, navigate]);
  useEffect(() => {
    // Xóa Refresh Token khi người dùng đăng xuất hoặc đóng tab
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("refreshToken");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Container>
      {token !== null ? null : (
        <div className={styles.LoginContainer}>
          <div className={styles.LoginForm}>
            {error ? (
              <div style={{ marginBottom: "26px", color: "red" }}>
                Username hoặc mật khẩu không đúng!{" "}
              </div>
            ) : (
              ""
            )}
            <div>
              <input
                className={styles.inputContainer}
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                className={styles.inputContainer}
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={styles.btnLogin} onClick={() => submit()}>
              Đăng nhập
            </button>
            <div className={styles.forgotPass}>
              <a href="#">Quên mật khẩu</a>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

// chrome.exe --disable-web-security --user-data-dir="C:\some\directory"
