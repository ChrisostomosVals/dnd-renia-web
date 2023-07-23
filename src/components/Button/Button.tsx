import { FC } from "react";
import { ButtonProps } from "./ButtonProps";
import * as Styled from './Button.style'
export const Button:FC<ButtonProps> = ({
    onClick,
    children,
    fullWidth,
    variant = 'primary',
    type = 'submit'
}) => {


    return(
        <Styled.Button fullWidth={fullWidth} onClick={onClick} variant={variant} type={type}>
            {children}
        </Styled.Button>
    )
}