import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RequireAuth from "../../access/RequireAuth";
import * as Styled from "./Character.styles";
import CharacterModel from "../../dist/models/CharacterModel";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Typography from "../../components/Typography/Typography";
import { Paths } from "../../routes/paths";
import { FaRegChartBar, FaMedal, FaImages } from "react-icons/fa";
import { GiSkills, GiBattleGear, GiRun } from "react-icons/gi";
import { UpdateCharacterForm } from "../../blocks/forms/updateCharacterForm/UpdateCharacterForm";
import { CharacterInfo } from "../../blocks/characterInfo/CharacterInfo";
import GameMasterFilter from "../../components/Filters/GameMasterFilter";
export const CharacterPage: FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterModel>();
  const characters = useSelector((state: RootState) => state.world.characters);
  const user = useSelector((state: RootState) => state.account.user);
  useEffect(() => {
    if (id) {
      const findCharacter = characters.find((character) => character.id === id);
      if (findCharacter) setCharacter(findCharacter);
    }
  }, [id, characters]);
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
              <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.Stats}`}>
                <Typography variant="heading2" align="center">
                  Stats
                </Typography>
                <FaRegChartBar size={35} />
              </Styled.IconLink>
              <GameMasterFilter>
                <Styled.IconLink
                  to={`${Paths.Characters}/${id}${Paths.Skills}`}
                >
                  <Typography variant="heading2" align="center">
                    Skills
                  </Typography>
                  <GiSkills size={35} />
                </Styled.IconLink>
                <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.Gear}`}>
                  <Typography variant="heading2" align="center">
                    Gear
                  </Typography>
                  <GiBattleGear size={35} />
                </Styled.IconLink>
                <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.Feats}`}>
                  <Typography variant="heading2" align="center">
                    Feats
                  </Typography>
                  <FaMedal size={35} />
                </Styled.IconLink>
                <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.SpecialAbilities}`}>
                  <Typography variant="heading2" align="center">
                    Special Abilities
                  </Typography>
                  <GiRun size={35} />
                </Styled.IconLink>
              </GameMasterFilter>
              <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.Images}`}>
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

const Character = RequireAuth(CharacterPage);

export default Character;
