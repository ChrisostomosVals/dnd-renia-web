import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`
export const Title = styled.div`
    display: flex;
    justify-content: center;
${({ theme }) => css`
    padding: ${theme.spacing.base32}
`}
`
