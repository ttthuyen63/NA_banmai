import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "../css/Login.module.css";
import { login, loginAsync, logout } from "../redux/userSlice";
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
        },
        {
          headers: {
            // "Content-Type": "application/json",
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
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

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
            <button
              className={styles.btnLogin}
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
            >
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
