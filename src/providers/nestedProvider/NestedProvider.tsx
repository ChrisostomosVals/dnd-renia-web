import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { theme } from "../../theme";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "../authProvider/AuthProvider";
import settingsActions from "../../store/settings/actions";
import { ColorVariantType } from "../../theme/color";
import { ToastContainer } from "react-toastify";

const NestedProvider:FC<{children: ReactNode}> = ({children}) =>{
    const mode = useSelector((state: RootState) => state.settings.preferences.themeMode);
    const dispatch = useDispatch();
    useEffect(() => {
      const themeMode = localStorage.getItem('themeMode') ?? 'light';
      dispatch(settingsActions.changeTheme(themeMode as ColorVariantType))
    },[mode])
  
  const themeWithMode = {
    ...theme,
    mode,
  };
  return(
    <ThemeProvider theme={themeWithMode}>
        <AuthProvider>
            {children}
            <ToastContainer
              theme={mode}
            />
        </AuthProvider>
    </ThemeProvider>
  )
}

export default NestedProvider;