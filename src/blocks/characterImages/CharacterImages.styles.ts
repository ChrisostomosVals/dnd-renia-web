import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;
export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CarouselContainer = styled.div`
  max-width: 600px;
${({theme}) => css`
  margin: ${theme.spacing.base80} auto;
`}
`;
export const CarouselImage = styled.img`
display: block;
width: 100%;
height: 500px;
`;


export const Image = styled.img`
  height: 500px;
  object-fit: cover;
  cursor: pointer;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ThumbnailImage = styled.img`
  width: 100px;
  height: auto;
  cursor: pointer;
`;

export const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 100;
${({theme}) => css`
  color: ${theme.color[theme.mode].icon};
  font-size: ${theme.spacing.base32};
  padding: ${theme.spacing.base8};
  &:hover {
    color: ${theme.color[theme.mode].hover};
  }
`}
`;

export const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

export const RightArrow = styled(ArrowButton)`
  right: 10px;
`;
export const ModalFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

export const TrashIcon = styled.div`
position: relative;
cursor: pointer;
z-index: 100;
${({theme}) => css`
  top: ${theme.spacing.base32};
  left: ${theme.spacing.base12};
`}
`;

export const ReactIcon = styled.div`
${({theme}) => css`
    svg {
        color: ${theme.color[theme.mode].icon};
        padding: ${theme.spacing.base8};
    }
    svg:hover {
        color:  ${theme.color[theme.mode].iconHover};
        cursor: pointer;
    }`}
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
${({theme}) => css`
    gap: ${theme.spacing.base12};
`}
`;

export const Buttons = styled.div`
display: flex;
align-items: center;
${({theme}) => css`
  gap: ${theme.spacing.base12};
`}
`;

export const SpinnerContainer = styled.div`
  position: absolute;
  top: 30%;
  right: 50%;
`;