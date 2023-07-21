import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import * as Styled from "./Character.styles";
import CharacterModel from "../../dist/models/CharacterModel";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Typography from "../../components/Typography/Typography";
import { Paths } from "../../routes/paths";
import { FaRegChartBar, FaMedal, FaImages } from "react-icons/fa";
import { GiSkills, GiBattleGear, GiRun } from "react-icons/gi";
import { UpdateCharacterForm } from "../../blocks/forms/updateCharacterForm/UpdateCharacterForm";
export const CharacterPage: FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterModel>();
  const characters = useSelector((state: RootState) => state.world.characters);
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
            <UpdateCharacterForm character={character} />
          <Styled.NavArea>
            <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.Stats}`}>
              <Typography variant="heading2" align="center">
                Stats
              </Typography>
              <FaRegChartBar size={35} />
            </Styled.IconLink>
            <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.Skills}`}>
              <Typography variant="heading2" align="center">
                Skills
              </Typography>
              <GiSkills size={35} />
            </Styled.IconLink>
            <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.Stats}`}>
              <Typography variant="heading2" align="center">
                Gear
              </Typography>
              <GiBattleGear size={35} />
            </Styled.IconLink>
            <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.Stats}`}>
              <Typography variant="heading2" align="center">
                Feats
              </Typography>
              <FaMedal size={35} />
            </Styled.IconLink>
            <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.Stats}`}>
              <Typography variant="heading2" align="center">
                Special Abilities
              </Typography>
              <GiRun size={35} />
            </Styled.IconLink>
            <Styled.IconLink to={`${Paths.Characters}/${id}${Paths.Stats}`}>
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

const Character = AuthMiddleware(CharacterPage);

export default Character;
