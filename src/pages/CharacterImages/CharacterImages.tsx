import { FC } from "react";
import { CharacterImgs } from "../../blocks/characterImages/CharacterImages";
import RequireAuth from "../../access/RequireAuth";

const ImagesPage:FC = () => <CharacterImgs />

const CharacterImages = RequireAuth(ImagesPage);

export default CharacterImages;