import styled, { css } from "styled-components";

export const ReactIcon = styled.div`
${({theme}) => css`
    svg {
        color: ${theme.color[theme.mode].icon};
        padding: ${theme.spacing.base8};
    }
    svg:hover {
        color:  ${theme.color[theme.mode].iconHover};
        cursor: pointer;
    }`}
`;