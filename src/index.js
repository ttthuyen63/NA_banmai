import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./pages/login";
import Staff from "./pages/staff/Staff";
import StaffDetail from "./pages/staff/StaffDetail";
import EditStaff from "./pages/staff/EditStaff";
import Account from "./pages/account/Account";
import AddAccount from "./pages/account/AddAccount";
import UpdatePassword from "./pages/account/UpdatePassword";
import Extend from "./pages/extend/Extend";
import CreateStaff from "./pages/staff/CreateStaff";
import KitchenManage from "./pages/extend/KitchenManage";
import CreateKitchen from "./pages/extend/CreateKitchen";
import KitchenDetail from "./pages/extend/KitchenDetail";
import KitchenStaffDetail from "./pages/extend/KitchenStaffDetail";
import EditKitchen from "./pages/extend/EditKitchen";
import Settings from "./pages/setting/Settings";
import store from "./redux/store";
import ProtectRouter from "./components/ProtectRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRouter>
        <Staff />
      </ProtectRouter>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/staffDetail/:personnel_code",
    element: (
      <ProtectRouter>
        <StaffDetail />
      </ProtectRouter>
    ),
  },
  {
    path: "/staffEdit/:personnel_code",
    element: (
      <ProtectRouter>
        <EditStaff />
      </ProtectRouter>
    ),
  },
  {
    path: "/createStaff",
    element: (
      <ProtectRouter>
        <CreateStaff />
      </ProtectRouter>
    ),
  },
  {
    path: "/account",
    element: (
      <ProtectRouter>
        <Account />
      </ProtectRouter>
    ),
  },
  // {
  //   path: "/account",
  //   element: <EmptyAccount />,
  // },
  {
    path: "/createAccount",
    element: (
      <ProtectRouter>
        <AddAccount />
      </ProtectRouter>
    ),
  },
  {
    path: "/updatePassword",
    element: (
      <ProtectRouter>
        <UpdatePassword />
      </ProtectRouter>
    ),
  },
  {
    path: "/extend",
    element: (
      <ProtectRouter>
        <Extend />
      </ProtectRouter>
    ),
  },
  {
    path: "/kitchenManager",
    element: (
      <ProtectRouter>
        <KitchenManage />
      </ProtectRouter>
    ),
  },
  {
    path: "/createKitchen",
    element: (
      <ProtectRouter>
        <CreateKitchen />
      </ProtectRouter>
    ),
  },
  {
    path: "/kitchenDetail/:kitchen_code",
    element: (
      <ProtectRouter>
        <KitchenDetail />
      </ProtectRouter>
    ),
  },
  {
    path: "/kitchenStaffDetail",
    element: (
      <ProtectRouter>
        <KitchenStaffDetail />
      </ProtectRouter>
    ),
  },
  {
    path: "/kitchenEdit/:kitchen_code",
    element: (
      <ProtectRouter>
        <EditKitchen />
      </ProtectRouter>
    ),
  },
  {
    path: "/setting",
    element: (
      <ProtectRouter>
        <Settings />
      </ProtectRouter>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
