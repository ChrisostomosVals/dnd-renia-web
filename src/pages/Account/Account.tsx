import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import * as Styled from "./Account.styles";
import { Typography } from "../../components/Typography/Typography.style";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import CharacterModel from "../../dist/models/CharacterModel";
import CharacterApi from "../../dist/api/CharacterApi";
import { ToastContainer, toast } from "react-toastify";
import { ChangePasswordForm } from "../../blocks/forms/changePasswordForm/ChangePasswordForm";
const AccountPage: FC = () => {
  const user = useSelector((state: RootState) => state.account.user);
  const url = useSelector((state: RootState) => state.settings.url);
  const token = useSelector(
    (state: RootState) => state.account.token?.access_token ?? ""
  );
  const themeMode = useSelector(
    (state: RootState) => state.settings.preferences.themeMode
  );
  const [character, setCharacter] = useState<CharacterModel>();
  useEffect(() => {
    if (!!user && !!user.characterId) {
      CharacterApi.GetByIdAsync(token, url, user.characterId).then(
        (response) => {
          if (response.isError) {
            toast.error("Failed to fetch your character");
          } else {
            setCharacter(response.data!);
          }
        }
      );
    }
  }, [user]);
  return (
    <Styled.Container>
      <Styled.ContainerArea>
        {!!user && (
          <Styled.Title>
            <Typography variant="heading1" align="center">
              {user.name}
            </Typography>
          </Styled.Title>
        )}
        {(!!character && !!user) && (
          <Styled.Section>
            <Styled.InfoArea>
            <ChangePasswordForm id={user?.id}/>
            </Styled.InfoArea>
          <Styled.InfoArea>
          <Typography variant="heading2" align="center">
              Your Character
            </Typography>
            <Typography variant="heading2" align="center">
              {character.name}
            </Typography>
          </Styled.InfoArea>
          </Styled.Section>
        )}
      </Styled.ContainerArea>
      <ToastContainer theme={themeMode} />
    </Styled.Container>
  );
};

const Account = AuthMiddleware(AccountPage);

export default Account;
