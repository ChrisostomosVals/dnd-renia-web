import { FC } from "react";
import StatModel from "../../dist/models/StatModel";
import * as Styled from './Stat.styles';
import Typography from "../Typography/Typography";
export const Stat:FC<StatModel> = ({
    name,
    value,
    shown
}) =>{

    return(
        <Styled.Container>
            <Typography variant="paragraphLarge" align="center">{name}</Typography>
            <Typography variant="paragraphLarge" align="center">{value}</Typography>
        </Styled.Container>
    )
}