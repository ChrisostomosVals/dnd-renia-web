import { Outlet } from "react-router-dom";
import { Header } from "../blocks/header/Header";
import SideBar from "../blocks/sideBar/SideBar";

const Layout = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default Layout;