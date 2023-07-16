import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  fetchCharacters,
  fetchRacesAndClasses,
} from "../../store/world/thunks";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import * as Styled from "./Characters.styles";
import { Typography } from "../../components/Typography/Typography.style";
import Table from "../../blocks/table/Table";
import { FaCircleInfo } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
              Info: <Styled.IconLink to={`${character.id}`}><FaCircleInfo cursor='pointer'/></Styled.IconLink>,
            }))}
          />
        )}
      </Styled.TableContainer>
    </Styled.Container>
  );
};

const Characters = AuthMiddleware(CharactersPage);
export default Characters;
