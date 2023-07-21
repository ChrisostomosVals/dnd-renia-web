import styled, { css } from "styled-components";

export const Container = styled.div`
${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.base16};
    `}
`