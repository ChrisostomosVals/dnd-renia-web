import { FC, useContext } from "react";
import * as Styled from "./Header.styles";
import { AiOutlineLogout, AiFillSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../../providers/authProvider/AuthContext.types";
import { AuthContext } from "../../providers/authProvider/AuthProvider";
import { FaDiceD20 } from "react-icons/fa";
export const Header: FC = () => {
  const navigate = useNavigate();
  const { toggleAuthentication } = useContext<AuthContextType>(AuthContext);
  const logout = (): void => {
    localStorage.removeItem("token");
    toggleAuthentication(false);
    navigate("/login");
  };
  return (
    <Styled.Header>
      <Styled.LeftSection>
      <Styled.ReactIcon>
        <FaDiceD20
          cursor="pointer"
          size={40}
          onClick={() => navigate("/")}
        />
      </Styled.ReactIcon>
      </Styled.LeftSection>
      <Styled.RightSection>
      <Styled.ReactIcon>
        <AiFillSetting
          cursor="pointer"
          size={40}
          onClick={() => navigate("/settings")}
        />
      </Styled.ReactIcon>
      <Styled.ReactIcon>
        <AiOutlineLogout cursor="pointer" size={40} onClick={logout} />
      </Styled.ReactIcon>
      </Styled.RightSection>
    </Styled.Header>
  );
};
