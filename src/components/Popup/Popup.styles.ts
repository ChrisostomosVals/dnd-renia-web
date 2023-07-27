import { Popup } from "react-leaflet";
import styled, { css } from "styled-components";

export const StyledPopup = styled(Popup)`
  ${({ theme }) => css`
    .leaflet-popup-content-wrapper {
      background-color: ${theme.color[theme.mode].primary} !important;
      border-radius: ${theme.spacing.base12} !important;
    }

    .leaflet-popup-content {
      color: ${theme.color[theme.mode].text}; /* Change text color if needed */
    }

    .leaflet-container a.leaflet-popup-close-button {
      color: ${theme.color[theme.mode].icon}!important;
    }
  `}
  
  .leaflet-popup-tip-container {
    visibility: hidden;
  }
`;