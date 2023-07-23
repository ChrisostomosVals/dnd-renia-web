import { FC, useEffect, useState } from "react";
import RequireAuth from "../../access/RequireAuth";
import * as Styled from "./AccountCharacter.styles";
import CharacterModel from "../../dist/models/CharacterModel";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Typography from "../../components/Typography/Typography";
import { Paths } from "../../routes/paths";
import { FaRegChartBar, FaMedal, FaImages } from "react-icons/fa";
import { GiSkills, GiBattleGear, GiRun } from "react-icons/gi";
import { UpdateCharacterForm } from "../../blocks/forms/updateCharacterForm/UpdateCharacterForm";
import { CharacterInfo } from "../../blocks/characterInfo/CharacterInfo";
import CharacterApi from "../../dist/api/CharacterApi";
import { toast } from "react-toastify";
export const AccountCharacterPage: FC = () => {
  const [character, setCharacter] = useState<CharacterModel>();
  const user = useSelector((state: RootState) => state.account.user);
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  useEffect(() => {
    if (token && user && user.characterId) {
      CharacterApi.GetByIdAsync(token.access_token, url, user.characterId).then(response => {
        if(response.isError){
            console.log(response.error);
            toast.error('Failed to fetch your Character');
        }
        else{
            setCharacter(response.data!);
        }
      })
    }
  }, [user]);
  return (
    <Styled.Container>
      {!!character && (
        <Styled.ContainerArea>
          <Styled.Title>
            <Typography variant="heading1" align="center">
              {character.name}
            </Typography>
          </Styled.Title>
          <Styled.Section>
            {user?.role === "GAME MASTER" ? (
              <UpdateCharacterForm character={character} />
            ) : (
              <CharacterInfo character={character} />
            )}
            <Styled.NavArea>
              <Styled.IconLink to={`${Paths.AccountCharacter}${Paths.Stats}`}>
                <Typography variant="heading2" align="center">
                  Stats
                </Typography>
                <FaRegChartBar size={35} />
              </Styled.IconLink>
                <Styled.IconLink
                  to={`${Paths.AccountCharacter}${Paths.Skills}`}
                >
                  <Typography variant="heading2" align="center">
                    Skills
                  </Typography>
                  <GiSkills size={35} />
                </Styled.IconLink>
                <Styled.IconLink to={`${Paths.AccountCharacter}${Paths.Gear}`}>
                  <Typography variant="heading2" align="center">
                    Gear
                  </Typography>
                  <GiBattleGear size={35} />
                </Styled.IconLink>
                <Styled.IconLink to={`${Paths.AccountCharacter}${Paths.Feats}`}>
                  <Typography variant="heading2" align="center">
                    Feats
                  </Typography>
                  <FaMedal size={35} />
                </Styled.IconLink>
                <Styled.IconLink to={`${Paths.AccountCharacter}${Paths.SpecialAbilities}`}>
                  <Typography variant="heading2" align="center">
                    Special Abilities
                  </Typography>
                  <GiRun size={35} />
                </Styled.IconLink>
              <Styled.IconLink to={`${Paths.AccountCharacter}${Paths.Images}`}>
                <Typography variant="heading2" align="center">
                  Images
                </Typography>
                <FaImages size={35} />
              </Styled.IconLink>
            </Styled.NavArea>
          </Styled.Section>
        </Styled.ContainerArea>
      )}
    </Styled.Container>
  );
};

const AccountCharacter = RequireAuth(AccountCharacterPage);

export default AccountCharacter;
