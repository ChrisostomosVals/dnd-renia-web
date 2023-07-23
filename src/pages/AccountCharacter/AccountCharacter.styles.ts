import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`
export const ContainerArea = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
`
export const Title = styled.div`
${({ theme }) => css`
    display: flex;
    justify-content: center;
    padding: ${theme.spacing.base32};
`}
`
export const IconLink = styled(Link)`
${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacing.base12};
    gap: ${theme.spacing.base12};
    color: ${theme.color[theme.mode].link};
    background-color: ${theme.color[theme.mode].header};
    text-decoration: none;
    border-radius: 7px;
    &:hover {
        box-shadow: ${theme.shadow[theme.mode].horizontal}
          ${theme.shadow[theme.mode].vertical} ${theme.shadow[theme.mode].blur}
          ${theme.color[theme.mode].header};
      }
`}
`
export const Section = styled.div`
    display: flex;
    flex-direction: row;
`

export const NavArea = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
${({ theme }) => css`
    gap: ${theme.spacing.base12};
`}
`