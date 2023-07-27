import { FC, ReactNode } from "react";
import { StyledPopup } from "./Popup.styles";
export const CustomPopup:FC<{children:ReactNode}> = ({children}) => (
    <StyledPopup>
        {children}
    </StyledPopup>
) 