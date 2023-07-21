import { FC, ReactNode } from "react";
import * as Styled from './Modal.styles';
export const CustomModal:FC<{ open: boolean,children: ReactNode, footer:ReactNode}> = ({ open, children, footer}) => {
    if (!open) return null;
    return(
        <Styled.ModalOverlay>
            <Styled.ModalContent>
                {children}
                {footer}
            </Styled.ModalContent>
        </Styled.ModalOverlay>
    )
}