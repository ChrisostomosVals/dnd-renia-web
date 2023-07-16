import styled, { css } from "styled-components";

export const Header = styled.header`
${({theme}) => css`
    background-color: ${theme.color[theme.mode].header};
    display: flex;
    justify-content: space-between;
`}`
export const LeftSection = styled.div`
    display: flex;
    justify-content: flex-start;
`
export const RightSection = styled.div`
    display: flex;
    justify-content: flex-end;
`
export const ReactIcon = styled.div`
${({theme}) => css`
    svg {
        color: ${theme.color[theme.mode].icon};
        padding: ${theme.spacing.base8};
    }
    svg:hover {
        color:  ${theme.color[theme.mode].iconHover};
    `}
`;