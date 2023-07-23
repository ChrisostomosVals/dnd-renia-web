import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import { NewChapterForm } from "../../blocks/forms/newChapterForm/NewChapterForm";

export const NewChapterPage: FC = () => <NewChapterForm />;

const NewChapter = RequireAuth(NewChapterPage);

export default NewChapter;
