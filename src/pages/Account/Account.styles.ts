import { Link } from "react-router-dom";
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

export const IconLink = styled(Link)`
    display: flex;
    flex-direction: column;
    text-decoration: none;
    align-items: center;
${({ theme }) => css`
    padding: ${theme.spacing.base12};
    gap: ${theme.spacing.base12};
    color: ${theme.color[theme.mode].link};
    background-color: ${theme.color[theme.mode].header};
    border-radius: ${theme.spacing.base12};
    &:hover {
        box-shadow: ${theme.shadow[theme.mode].horizontal}
          ${theme.shadow[theme.mode].vertical} ${theme.shadow[theme.mode].blur}
          ${theme.color[theme.mode].header};
      }
`}
`