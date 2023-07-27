import { FC, ReactNode, useState } from "react";
import * as Styled from './Modal.styles';
export const CustomModal:FC<{ open: boolean,children: ReactNode, footer?:ReactNode, icon?: ReactNode}> = ({ open, children, footer, icon}) => {
    if (!open) return null;
    return(
        <Styled.ModalOverlay>
            <Styled.ModalContent>
                <Styled.ReactIcon>{icon}</Styled.ReactIcon>
                {children}
                {footer}
            </Styled.ModalContent>
        </Styled.ModalOverlay>
    )
}