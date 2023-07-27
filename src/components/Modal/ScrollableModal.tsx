import { FC, ReactNode } from "react";
import * as Styled from './ScrollableModal.styles';

export const ScrollableModal: FC<{ open: boolean,children: ReactNode, footer?:ReactNode, icon?: ReactNode}> = ({ open, children, icon }) => {
  if (!open) return null;

  return (
    <Styled.ModalOverlay>
      <Styled.ModalContent onClick={(e) => e.stopPropagation()}>
      <Styled.ReactIcon>{icon}</Styled.ReactIcon>
        {children}
      </Styled.ModalContent>
    </Styled.ModalOverlay>
  );
};