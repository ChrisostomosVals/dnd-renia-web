import { FC, useEffect } from "react";
import * as Styled from "./HomePage.style";
import Typography from "../../components/Typography/Typography";
import RequireAuth from "../../access/RequireAuth";
import { GiBodySwapping } from "react-icons/gi";
import { FaPlusSquare, FaUsers, FaMap, FaUserPlus } from "react-icons/fa";
import { Paths } from "../../routes/paths";
import GameMasterFilter from "../../components/Filters/GameMasterFilter";
import { GiBookCover } from "react-icons/gi";
const HomePage: FC = () => {
  useEffect(() => {}, []);
  return (
    <Styled.HomePageContainer>
      <Styled.Title>
        <Typography variant="heading1">Welcome to Renia</Typography>
      </Styled.Title>
      <Styled.NavArea>
        <Styled.MenuItemLinks to={Paths.Characters}>
          <GiBodySwapping size={70} />
          <Typography variant="heading1" align="center">Characters</Typography>
        </Styled.MenuItemLinks>
          <Styled.MenuItemLinks to={Paths.Chapters}>
            <GiBookCover size={70} />
            <Typography variant="heading1" align="center">Chapters</Typography>
          </Styled.MenuItemLinks>
          <Styled.MenuItemLinks to={Paths.NewCharacter}>
            <FaMap size={70} />
            <Typography variant="heading1" align="center">Map</Typography>
          </Styled.MenuItemLinks>
        <GameMasterFilter>
          <Styled.MenuItemLinks to={Paths.Users}>
            <FaUsers size={70} />
            <Typography variant="heading1" align="center">Users</Typography>
          </Styled.MenuItemLinks>
        </GameMasterFilter>
      </Styled.NavArea>
    </Styled.HomePageContainer>
  );
};

const Home = RequireAuth(HomePage);
export default Home;
