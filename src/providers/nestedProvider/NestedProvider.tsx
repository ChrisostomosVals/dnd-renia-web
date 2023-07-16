import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { theme } from "../../theme";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "../authProvider/AuthProvider";
import settingsActions from "../../store/settings/actions";
import { ColorVariantType } from "../../theme/color";

const NestedProvider:FC<{children: ReactNode}> = ({children}) =>{
    const mode = useSelector((state: RootState) => state.settings.preferences.themeMode);
    const dispatch = useDispatch();
    useEffect(() => {
      const themMode = localStorage.getItem('themeMode') ?? 'light';
      dispatch(settingsActions.changeTheme(themMode as ColorVariantType))
    },[mode])
  
  const themeWithMode = {
    ...theme,
    mode,
  };
  return(
    <ThemeProvider theme={themeWithMode}>
        <AuthProvider>
            {children}
        </AuthProvider>
    </ThemeProvider>
  )
}

export default NestedProvider;