import { FC, useEffect, useState } from "react";
import StatModel from "../../dist/models/StatModel";
import * as Styled from './Stats.styles';
import { Stat } from "../../components/Stat/Stat";
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
                    <Stat  name={stat.name} value={stat.value} shown={stat.shown}/>
                </Styled.StatContainer>
                )
            }
            </Styled.Box>
        </Styled.Container>
    )
}