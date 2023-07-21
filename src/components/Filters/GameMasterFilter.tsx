import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const GameMasterFilter: React.FC<{children: ReactNode}> = ({
    children,
  }) => {
    const user = useSelector((state: RootState) => state.account.user);
  
    if (user?.role === "GAME MASTER") {
      return <>{children}</>;
    }
  
    return null;
  };

export default GameMasterFilter;