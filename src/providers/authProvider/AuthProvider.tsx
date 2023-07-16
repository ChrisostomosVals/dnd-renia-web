import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { AuthContextType } from "./AuthContext.types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import accountActions from "../../store/account/actions";

export const AuthContext = createContext<AuthContextType>(({
  isAuthenticated: false,
  toggleAuthentication: (authenticated: boolean) => {}
}));

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    const token = useSelector((state: RootState) => state.account.token);
    const user = useSelector((state: RootState) => state.account.user);
    const toggleAuthentication = (authenticated: boolean): void => {
      setIsAuthenticated(authenticated);
    };
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      if(!token || !user){
        dispatch(accountActions.setProfile());
      }
    },[isAuthenticated, token, user])
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
}