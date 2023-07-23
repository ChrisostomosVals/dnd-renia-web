import styled, { css, keyframes } from "styled-components";

export const ModalOverlay = styled.div`
${({theme}) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  `}
`;

export const ModalContent = styled.div`
${({theme}) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 50vh;
    background-color: ${theme.color[theme.mode].modal};
    border-radius: 7px;
    box-shadow: 0 2px 4px ${theme.color[theme.mode].header};
    padding: ${theme.spacing.base32};
    animation: ${fadeIn} 0.3s ease-in-out;
  `}
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;