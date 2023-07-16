import styled, { css } from "styled-components";

export const HomePageContainer = styled.div`
${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: ${theme.spacing.base16};
  `}
`;