import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 30vw;
  ${({ theme }) => css`
    gap: ${theme.spacing.base12};
`}
`
export const Item = styled.div`
`
export const HorizontalLine = styled.div`
    position: relative;
    width: 100%;
    height: 1px;
    ${({ theme }) => css`
    background-color: ${theme.color[theme.mode].text};
  `}
`;
