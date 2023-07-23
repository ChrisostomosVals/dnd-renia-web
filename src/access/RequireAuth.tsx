import { ComponentType, useContext, useEffect } from "react";
import { AuthContext } from "../providers/authProvider/AuthProvider";
import { AuthContextType } from "../providers/authProvider/AuthContext.types";
import { useNavigate } from 'react-router-dom';

const RequireAuth = <P extends object>(WrappedComponent: ComponentType<P>) =>{
    const RequireAuthComponent: React.FC<P> = (props: P) => {
        const { isAuthenticated } = useContext<AuthContextType>(AuthContext);
        const navigate = useNavigate();
        useEffect(() => {
            if (!isAuthenticated) {
                navigate('/login');
            }
        }, [isAuthenticated, navigate]);
        if (isAuthenticated) {
          return <WrappedComponent {...props} />;
        }
        return null;
      };
    
      return RequireAuthComponent;
}


export default RequireAuth;