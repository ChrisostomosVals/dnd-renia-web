import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`
export const Title = styled.div`
${({ theme }) => css`
    display: flex;
    justify-content: center;
    padding: ${theme.spacing.base12}
`}
`

export const TableContainer = styled.div`
display: flex;
justify-content: center;
`;

export const IconLink = styled(Link)`
${({ theme }) => css`
    color: ${theme.color[theme.mode].link}
`}
`
