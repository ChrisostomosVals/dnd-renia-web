import styled, { css } from "styled-components";
import { theme } from "../../theme";

export const Container = styled.div`
${({theme}) => css`
    display: flex;
    flex-direction: column;
    height: 50vh;
    padding-top: ${theme.spacing.base16};
`}
`
export const Title = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`
export const SettingsArea = styled.div`
${({theme}) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: ${theme.spacing.base40};
`}
`
export const Section = styled.div`
    display: flex;
    justify-content: center;
`
export const Radio = styled.input`
${({theme}) => css`
    background-color: ${theme.color[theme.mode].input};
    color: ${theme.color[theme.mode].text};
    cursor: pointer;
    transform: scale(2);
    accent-color: ${theme.color[theme.mode].iconHover};
    &:hover{
        color: ${theme.color[theme.mode].iconHover};
    }
`}
`
export const Label = styled.label<{theme: typeof theme, selected: boolean}>`
${({ theme, selected }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-size: ${theme.typography.fontSize.base20};
    gap: ${theme.spacing.base12};
    color: ${selected ? theme.color[theme.mode].iconHover : theme.color[theme.mode].text};};
    cursor: pointer;
    &:hover{
        color: ${theme.color[theme.mode].iconHover};
    }
`}
`;