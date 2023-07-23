import { FC, ReactNode } from "react";
import * as Styled from './Error.styles'
export const ErrorMessage:FC<{children: ReactNode}> = ({children}) =>{

    return (
        <Styled.ErrorField>
            {children}
        </Styled.ErrorField>
    )
}