import { useSelector } from "react-redux";
import RequireAuth from "../../access/RequireAuth";
import * as Styled from "./Users.styles";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "../../blocks/table/Table";
import { Paths } from "../../routes/paths";
import Typography from "../../components/Typography/Typography";
import RequireGameMaster from "../../access/RequireGameMaster";
import UserApi from "../../dist/api/UserApi";
import CharacterApi from "../../dist/api/CharacterApi";
import { UserType } from "./Users.types";
import { FaUserPlus } from "react-icons/fa";
const UsersPage = () => {
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const [users, setUsers] = useState<UserType[]>([]);
  useEffect(() => {
    if (token) {
      UserApi.GetAsync(token.access_token, url).then((response) => {
        if (response.isError) {
          console.log(response.error);
          toast.error("Failed to fetch Users");
          return;
        }
        const fetchCharacterPromises = response.data!.map((user) => {
          if (user.characterId) {
            return CharacterApi.GetByIdAsync(token.access_token, url, user.characterId)
              .then((res) => {
                if (res.isError) {
                  return {
                    user: user,
                    characterName: "None",
                  };
                } else {
                  return {
                    user: user,
                    characterName: res.data!.name,
                  };
                }
              })
              .catch((error) => {
                console.error("Error fetching character data:", error);
                return {
                  user: user,
                  characterName: "Error",
                };
              });
          } else {
            return Promise.resolve({
              user: user,
              characterName: "None",
            });
          }
        });
        Promise.all(fetchCharacterPromises).then((usersWithCharacterData) => {
          setUsers(usersWithCharacterData);
        });
      });
    }
  }, [token]);
  
  return (
    <Styled.Container>
      <Styled.Title>
        <Typography variant="heading1">Users</Typography>
      </Styled.Title>
      <Styled.NavContainer>
        <Styled.IconLink to={Paths.NewUser}>
          <Typography variant="paragraphLarge">New User</Typography>
          <Styled.ReactIcon>
            <FaUserPlus size={40} />
          </Styled.ReactIcon>
        </Styled.IconLink>
      </Styled.NavContainer>
      <Styled.TableContainer>
        {!!users.length && (
          <Table
            data={users.map((user, index) => ({
              id: user.user.id,
              Name: user.user.name,
              Email: user.user.email,
              Role: user.user.role,
              Character: user.characterName,
              path: `${Paths.Users}/${user.user.id}`,
            }))}
          />
        )}
      </Styled.TableContainer>
    </Styled.Container>
  );
};

const Users = RequireGameMaster(RequireAuth(UsersPage));

export default Users;
