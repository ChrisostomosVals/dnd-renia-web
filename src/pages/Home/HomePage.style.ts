import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const HomePageContainer = styled.div`
${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: ${theme.spacing.base16};
  `}
`;
export const Title = styled.div`
  display: flex;
  justify-content: center;
`;


export const NavArea = styled.div`
${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: ${theme.spacing.base64};
  `}
`;

export const MenuItemLinks = styled(Link)`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-decoration: none;
${({theme}) => css`
    gap: ${theme.spacing.base16};
    padding: ${theme.spacing.base64};
    color: ${theme.color[theme.mode].text};
    flex: 0 0 calc(33.333% - ${theme.spacing.base64});
    &:hover {
      background-color: ${theme.color[theme.mode].header};
      color: ${theme.color[theme.mode].hover};
      text-align: center;
      border-radius: ${theme.spacing.base12};
    }
`}
`