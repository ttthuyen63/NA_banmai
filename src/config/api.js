import axios from "axios";

//config cho tất cả api
export const customAxios = axios.create({
  // baseURL: "https://635a75b46f97ae73a62d386d.mockapi.io",
  baseURL: "http://100.82.237.81:8889/banmai/api/v1",
  // timeout: 10000, //nếu quá 10s không có phản hồi thì api lỗi luôn
  //   hearders: { "X-Custom-Header": "foobar" },
});

export const url = "http://100.82.237.81:8889/banmai/api/v1";

export const localUrl = "http://localhost:3000";
