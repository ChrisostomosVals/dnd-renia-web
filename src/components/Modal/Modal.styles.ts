import styled, { css, keyframes } from "styled-components";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: none;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

export const ModalContent = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 50vh;
    width: 30vw;
    background-color: ${theme.color[theme.mode].modal};
    border-radius: ${theme.spacing.base12};
    box-shadow: 0 2px 4px ${theme.color[theme.mode].header};
    padding: ${theme.spacing.base32};
    animation: ${fadeIn} 0.3s ease-in-out;
  `}
`;

export const ReactIcon = styled.div`
  ${({ theme }) => css`
    position: absolute; /* Position the icon absolutely within the modal content */
    top: ${theme.spacing.base8};
    right: ${theme.spacing.base8};
    z-index: 2000;
    svg {
      color: ${theme.color[theme.mode].icon};
      padding: ${theme.spacing.base8};
    }
    svg:hover {
      color: ${theme.color[theme.mode].iconHover};
      cursor: pointer;
    }
  `}
`;