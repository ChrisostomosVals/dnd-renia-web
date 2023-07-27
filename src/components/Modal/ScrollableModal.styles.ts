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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalContent = styled.div`
  ${({ theme }) => css`
  position: relative;
  background-color: ${theme.color[theme.mode].modal};
  border-radius: ${theme.spacing.base12};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 16px;
  max-height: 80vh;
  min-height: 40vh;
  overflow-y: auto;
  box-shadow: 0 2px 4px ${theme.color[theme.mode].header};
    padding: ${theme.spacing.base32};
    animation: ${fadeIn} 0.3s ease-in-out;
  `}
  scrollbar-width: none; /* Hide the scrollbar in Firefox */
    -ms-overflow-style: none; /* Hide the scrollbar in IE and Edge */
    &::-webkit-scrollbar {
      width: 0; /* Hide the scrollbar in Chrome, Safari, and Opera */
    }
`;

export const ReactIcon = styled.div`
  ${({ theme }) => css`
    position: absolute;
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