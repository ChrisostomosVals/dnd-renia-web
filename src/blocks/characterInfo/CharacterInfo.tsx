import { FC } from "react";
import CharacterModel from "../../dist/models/CharacterModel";
import * as Styled from "./CharacterInfo.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export const CharacterInfo: FC<{ character: CharacterModel }> = ({
  character,
}) => {
    const classes = useSelector((state: RootState) => state.world.classes);
    const races = useSelector((state: RootState) => state.world.races);

  return (
    <Styled.Container>
      <Styled.Box>
        <Styled.Form>
        <Styled.AreaContainer>
          <Styled.Input
            id={`name`}
            type="text"
            defaultValue={character.name}
            disabled
          />
          <Styled.Label htmlFor={`name`}>Name</Styled.Label>
        </Styled.AreaContainer>
        <Styled.AreaContainer>
          <Styled.Input
            id={`race`}
            type="text"
            defaultValue={races.find(race => race.id === character.raceId)?.name}
            disabled
          />
          <Styled.Label htmlFor={`race`}>Race</Styled.Label>
        </Styled.AreaContainer>
        <Styled.AreaContainer>
          <Styled.Input
            id={`characterClass`}
            type="text"
            defaultValue={classes.find(cl => cl.id === character.classId)?.name}
            disabled
          />
          <Styled.Label htmlFor={`characterClass`}>Class</Styled.Label>
        </Styled.AreaContainer>
        <Styled.AreaContainer>
          <Styled.Input
            id={`type`}
            type="text"
            defaultValue={character.type}
            disabled
          />
          <Styled.Label htmlFor={`type`}>Type</Styled.Label>
        </Styled.AreaContainer>
        </Styled.Form>
      </Styled.Box>
    </Styled.Container>
  );
};
