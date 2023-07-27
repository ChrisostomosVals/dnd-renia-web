import styled, { css } from "styled-components";

export const PopupContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const PopupFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const MarkerTypesContainer = styled.div`
position: absolute;
display: flex;
flex-direction: column;
${({theme}) => css`
right: ${theme.spacing.base12};
top: ${theme.spacing.base12};
`}
`;

export const ReactIcon = styled.div`
z-index: 1000;
${({theme}) => css`
    svg {
        color: ${theme.color[theme.mode].markerPrimary};
        padding: ${theme.spacing.base8};
    }
    svg:hover {
        color:  ${theme.color[theme.mode].iconHover};
        cursor: pointer;
    }`
    }
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height:40vh;
    justify-content: space-between;
`;

export const ModalFooter = styled.div`
    display: flex;
    flex-direction: row;
    ${({theme}) => css`
        gap: ${theme.spacing.base32};
    `}
`;