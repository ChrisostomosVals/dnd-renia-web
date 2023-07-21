import { FC, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SideBar.data";
import * as Styled from "./SideBar.styles";
import { AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { AuthContextType } from "../../providers/authProvider/AuthContext.types";
import { AuthContext } from "../../providers/authProvider/AuthProvider";
import { removLocalStorageItems } from "../../utls/methods";
import { CustomModal } from "../../components/Modal/Modal";
import { Typography } from "../../components/Typography/Typography.style";
import { Button } from "../../components/Button/Button.style";

const Sidebar: FC = () => {
  const [close, setClose] = useState<boolean>(false);
  const showSidebar = () => setClose(!close);
  const navigate = useNavigate();
  const { toggleAuthentication } = useContext<AuthContextType>(AuthContext);
  const [open, setOpen] = useState<boolean>(false);
  const requestLogout = (): void => {
    setOpen(true);
  }
  const logout = (): void => {
    removLocalStorageItems([
      'token',
      'profile',
      'characters',
      'locations',
      'worldObjects'
    ])
    toggleAuthentication(false);
    navigate("/login");
  };
  const Footer:FC = () =>( 
    <Styled.ModalFooter>
      <Button fullWidth={false} variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button fullWidth={false} variant="primary" onClick={logout}>Confirm</Button>
    </Styled.ModalFooter>
  )
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
          <Styled.ReactIcon>
            <FaIcons.FaUserAlt cursor="pointer" onClick={() => navigate("/account")} />
          </Styled.ReactIcon>
          <Styled.ReactIcon onClick={() => navigate("/settings")}>
            <AiFillSetting cursor='pointer' />
          </Styled.ReactIcon>
          <Styled.ReactIcon>
            <AiOutlineLogout cursor="pointer" onClick={requestLogout} />
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
              {<item.Filter><Styled.MenuItemLinks to={item.path}>
                {item.icon}
                <span style={{ marginLeft: "16px" }}>{item.title}</span>
              </Styled.MenuItemLinks></item.Filter>}
            </Styled.MenuItems>
          );
        })}
      </Styled.SidebarMenu>
      <CustomModal footer={<Footer/>} open={open}>
        <Typography variant="heading1" align="center">Are you sure you want to logout?</Typography>
      </CustomModal>
    </>
  );
};



export default Sidebar;
