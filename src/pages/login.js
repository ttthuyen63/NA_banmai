import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "../css/Login.module.css";
import { login, loginAsync } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const token = useSelector((state) => state.userReducer.token);
  const submit = async () => {
    try {
      const res = await axios.post(
        "http://100.82.237.81:8888/banmai/api/v1/authentication/login",
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
      dispatch(login(accessToken));

      navigate("/");
      console.log("token", accessToken);
    } catch (error) {
      setError("username hoặc mật khẩu không đúng!");
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
              Login
            </button>
            <div className={styles.forgotPass}>
              <a href="#">Forgot Password?</a>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
