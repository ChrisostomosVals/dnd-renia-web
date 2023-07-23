import { FC, useEffect, useState } from "react";
import StatModel from "../../dist/models/StatModel";
import * as Styled from './Stats.styles';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Typography } from "../../components/Typography/Typography.style";

export const Stats:FC = () =>{
    const [stats, setStats] = useState<StatModel[]>([]);
    const { id } = useParams();
    const characters = useSelector((state: RootState) => state.world.characters);
    const [name, setName] = useState<string>('')
    useEffect(() => {
        if(id){
          const findCharacter = characters.find(character => character.id === id);
          if(findCharacter){
            setName(findCharacter.name);
            setStats(findCharacter.stats ?? []);
          }
      }
      }, [id]);
    return(
        <Styled.Container>
            <Styled.Title>
            <Typography variant="heading1">{name}: Skills</Typography>
            </Styled.Title>
            <Styled.Box>
            {
                !!stats.length &&
                stats.map((stat, index) => 
                <Styled.StatContainer key={stat.name + index}>
                    <Styled.Input
                    id={stat.value}
                    type="text"
                    placeholder={stat.name}
                    defaultValue={stat.value}
                    disabled
                    />
                    <Styled.Label htmlFor={stat.value}>{stat.name}</Styled.Label>
                </Styled.StatContainer>
                )
            }
            </Styled.Box>
        </Styled.Container>
    )
}