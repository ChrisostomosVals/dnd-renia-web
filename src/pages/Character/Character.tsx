import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

export const CharacterPage:FC = () =>{
    const { id } = useParams();
    useEffect(() => {
        console.log(id)
    },[id])
    return(
        <div>
            
        </div>
    )
}

const Character = AuthMiddleware(CharacterPage);

export default Character;