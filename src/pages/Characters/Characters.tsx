import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  fetchCharacters,
  fetchRacesAndClasses,
} from "../../store/world/thunks";
import RequireAuth from "../../access/RequireAuth";
import * as Styled from "./Characters.styles";
import { Typography } from "../../components/Typography/Typography.style";
import Table from "../../blocks/table/Table";
import { Paths } from "../../routes/paths";
import { FaUserPlus } from "react-icons/fa";
import GameMasterFilter from "../../components/Filters/GameMasterFilter";
const CharactersPage: FC = () => {
  const characters = useSelector((state: RootState) => state.world.characters);
  const classes = useSelector((state: RootState) => state.world.classes);
  const races = useSelector((state: RootState) => state.world.races);
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (token) {
      dispatch(fetchRacesAndClasses({ token: token?.access_token, url: url }));
      dispatch(fetchCharacters({ token: token?.access_token, url: url }));
    }
  }, [token, url, dispatch]);
  return (
    <Styled.Container>
      <Styled.Title>
        <Typography variant="heading1">Characters</Typography>
      </Styled.Title>
      <GameMasterFilter>
        <Styled.NavContainer>
          <Styled.IconLink to={Paths.NewCharacter}>
            <Typography variant="paragraphLarge">New Character</Typography>
            <Styled.ReactIcon>
              <FaUserPlus size={40} />
            </Styled.ReactIcon>
          </Styled.IconLink>
        </Styled.NavContainer>
      </GameMasterFilter>
      <Styled.TableContainer>
        {!!characters.length && !!races.length && !!classes.length && (
          <Table
            data={characters.map((character) => ({
              id: character.id,
              Name: character.name,
              Type: character.type,
              Class: !!classes.find(
                (characterClass) => character.classId === characterClass.id
              )
                ? classes.find(
                    (characterClass) => character.classId === characterClass.id
                  )!.name
                : "unknown",
              Race: !!races.find((race) => character.raceId === race.id)
                ? races.find((race) => character.raceId === race.id)!.name
                : "unknown",
              path: `${Paths.Characters}/${character.id}`,
            }))}
          />
        )}
      </Styled.TableContainer>
    </Styled.Container>
  );
};

const Characters = RequireAuth(CharactersPage);
export default Characters;
