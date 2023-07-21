import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { theme } from '../../theme'

export const Navbar = styled.div`
${({theme}) => css `
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${theme.color[theme.mode].header};
    `}
`

export const MenuIconOpen = styled(Link)`
${({theme}) => css `
    font-size: 40px;
    color: ${theme.color[theme.mode].icon};
    svg {
        color: ${theme.color[theme.mode].icon};
        padding: 0 ${theme.spacing.base8};
    }
    svg:hover {
        color:  ${theme.color[theme.mode].iconHover};
    `}
`

export const MenuIconClose = styled(Link)`
${({theme}) => css `
    display: flex;
    justify-content: end;
    font-size: 1.5rem;
    color: ${theme.color[theme.mode].icon};
    svg {
        color: ${theme.color[theme.mode].icon};
        padding: ${theme.spacing.base8};
    }
    svg:hover {
        color:  ${theme.color[theme.mode].iconHover};
    `}
`

export const SidebarMenu = styled.div<{theme: typeof theme; close: boolean}>`
${({theme, close}) => css `
    width: 250px;
    height: 100vh;
    background-color: ${theme.color[theme.mode].sideBar};
    position: fixed;
    top: 0;
    left: ${close ? '0' : '-100%'};
    transition: .6s;
    `}
`

export const MenuItems = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 90px;
`

export const MenuItemLinks = styled(Link)`
${({theme}) => css `
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 20px;
    text-decoration: none;
    color: ${theme.color[theme.mode].text};

    &:hover {
        background-color: ${theme.color[theme.mode].text};
        color: ${theme.color[theme.mode].hover};
        width: 100%;
        height: 45px;
        text-align: center;
        border-radius: 5px;
        margin: 0 2rem;
    }
`}
`
export const LeftSection = styled.div`
    display: flex;
    justify-content: flex-start;
`
export const RightSection = styled.div`
    display: flex;
    justify-content: flex-end;
`
export const ReactIcon = styled.div`
${({theme}) => css`
    font-size: 40px;
    svg {
        color: ${theme.color[theme.mode].icon};
        padding: 0 ${theme.spacing.base8};
    }
    svg:hover {
        color:  ${theme.color[theme.mode].iconHover};
    `}
`;

export const ModalFooter = styled.div`
${({theme}) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    `}
`