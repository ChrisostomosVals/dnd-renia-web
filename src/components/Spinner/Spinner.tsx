import { FC } from "react";
import { TailSpin } from "react-loader-spinner";
import { theme } from "../../theme";

export const Spinner:FC<{visible: boolean}> = ({visible}) => {

    return(
        <TailSpin
            height={theme.spacing.base80}
            width={theme.spacing.base80}
            color={theme.color[theme.mode].primary}
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={visible}
        />
    )
}