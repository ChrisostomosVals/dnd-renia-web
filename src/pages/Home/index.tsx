import { FC, useEffect } from "react";
import * as Styled from './HomePage.style';
import Typography from "../../components/Typography/Typography";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchRacesAndClasses } from "../../store/world/thunks";

const HomePage: FC = () => {
    useEffect(() => {
      
    },[])
    return(
        <Styled.HomePageContainer>
            <Typography variant='heading1'>Welcome to Renia</Typography>
        </Styled.HomePageContainer>
    )
}

const Home = AuthMiddleware(HomePage);
export default Home;