import { FC, useEffect } from "react";
import * as Styled from './HomePage.style';
import Typography from "../../components/Typography/Typography";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchRacesAndClasses } from "../../store/world/thunks";

const HomePage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.account.token?.access_token ?? '');
    const url = useSelector((state: RootState) => state.settings.url);
    useEffect(() => {
      
    },[])
    return(
        <Styled.HomePageContainer>
            <Typography variant='heading1'>Renia</Typography>
        </Styled.HomePageContainer>
    )
}

const Home = AuthMiddleware(HomePage);
export default Home;