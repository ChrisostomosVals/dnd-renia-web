import styled, { css } from "styled-components";

export const Container = styled.div`
${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: ${theme.spacing.base12};
`}
`
export const Title = styled.div`
  ${({ theme }) => css`
  display: flex;
  justify-content: center;
  padding-top: ${theme.spacing.base32};
  `}
`;

export const Box = styled.div`
${({ theme }) => css`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: ${theme.spacing.base16};
    padding: ${theme.spacing.base16};
  `}
`;

export const StatContainer = styled.div`
    flex: 30%;
`