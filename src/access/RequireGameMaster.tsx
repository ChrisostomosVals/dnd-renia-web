import { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { RootState } from "../store";

const RequireGameMaster = <P extends object>(WrappedComponent: ComponentType<P>) =>{
    const RequireGameMasterComponent: React.FC<P> = (props: P) => {
        const user = useSelector((state: RootState) => state.account.user);
        const navigate = useNavigate();
        useEffect(() => {
            if (user && user.role !== 'GAME MASTER') {
                navigate('/');
            }
        }, [user, navigate]);
        if (user?.role === 'GAME MASTER') {
          return <WrappedComponent {...props} />;
        }
        return null;
      };
    
      return RequireGameMasterComponent;
}


export default RequireGameMaster;