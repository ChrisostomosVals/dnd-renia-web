import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
${({ theme }) => css`
    gap: ${theme.spacing.base12};
`}
`
export const TableContainer = styled.div`
display: flex;
justify-content: center;
`;
export const Title = styled.div`
    display: flex;
    justify-content: center;
${({ theme }) => css`
    padding: ${theme.spacing.base32}
`}
`
export const ReactIcon = styled.div`
${({ theme }) => css`
    svg {
        color: ${theme.color[theme.mode].icon};
        padding: ${theme.spacing.base8};
    }
    svg:hover {
        color:  ${theme.color[theme.mode].iconHover};
        cursor: pointer;
    }`}
`;

export const IconLink = styled(Link)`
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
${({ theme }) => css`
    padding: ${theme.spacing.base12};
    &:hover {
      background-color: ${theme.color[theme.mode].header};
      color: ${theme.color[theme.mode].hover};
      text-align: center;
      border-radius: ${theme.spacing.base12};
    }
`}
`
export const NavContainer = styled.div`
    display: flex;
    justify-content: center;
`;