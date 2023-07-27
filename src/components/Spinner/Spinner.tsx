import { FC, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { theme } from "../../theme";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Spinner:FC<{visible: boolean}> = ({visible}) => {
    const mode = useSelector((state: RootState) => state.settings.preferences.themeMode);
    return(
        <TailSpin
            height={theme.spacing.base80}
            width={theme.spacing.base80}
            color={theme.color[mode].primary}
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={visible}
        />
    )
}