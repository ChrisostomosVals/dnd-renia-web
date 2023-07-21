import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`
export const Title = styled.div`
${({ theme }) => css`
    display: flex;
    justify-content: center;
    padding: ${theme.spacing.base32};
`}
`
export const ContainerArea = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
`

export const Section = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
width: 50vw;
`
export const InfoArea = styled.div`
display: flex;
justify-content: space-around;
flex-direction: column;
`