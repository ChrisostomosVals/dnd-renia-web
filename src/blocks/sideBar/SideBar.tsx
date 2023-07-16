import { FC, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SideBar.data";
import * as Styled from "./SideBar.styles";
import { AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { AuthContextType } from "../../providers/authProvider/AuthContext.types";
import { AuthContext } from "../../providers/authProvider/AuthProvider";

const Sidebar: FC = () => {
  const [close, setClose] = useState<boolean>(false);
  const showSidebar = () => setClose(!close);
  const navigate = useNavigate();
  const { toggleAuthentication } = useContext<AuthContextType>(AuthContext);
  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    toggleAuthentication(false);
    navigate("/login");
  };
  return (
    <>
      <Styled.Navbar>
        <Styled.LeftSection>
          <Styled.ReactIcon onClick={() => navigate("/")}>
            <FaIcons.FaHome cursor='pointer' />
          </Styled.ReactIcon>
          <Styled.MenuIconOpen to="#" onClick={showSidebar}>
            <FaIcons.FaBars />
        </Styled.MenuIconOpen>
        </Styled.LeftSection>
        <Styled.RightSection>
          <Styled.ReactIcon onClick={() => navigate("/settings")}>
            <AiFillSetting cursor='pointer' />
          </Styled.ReactIcon>
          <Styled.ReactIcon>
            <AiOutlineLogout cursor="pointer" size={40} onClick={logout} />
          </Styled.ReactIcon>
        </Styled.RightSection>
       
        
      </Styled.Navbar>

      <Styled.SidebarMenu close={close}>
        <Styled.MenuIconClose to="#" onClick={showSidebar}>
          <FaIcons.FaTimes />
        </Styled.MenuIconClose>

        {SidebarData.map((item, index) => {
          return (
            <Styled.MenuItems key={index}>
              <Styled.MenuItemLinks to={item.path}>
                {item.icon}
                <span style={{ marginLeft: "16px" }}>{item.title}</span>
              </Styled.MenuItemLinks>
            </Styled.MenuItems>
          );
        })}
      </Styled.SidebarMenu>
      
    </>
  );
};

export default Sidebar;
