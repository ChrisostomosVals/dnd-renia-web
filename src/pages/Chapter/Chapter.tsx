import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import { EditChapterForm } from "../../blocks/forms/editChapterForm/EditChapterForm";

const ChapterPage: FC = () => <EditChapterForm/>

const Chapter = RequireAuth(ChapterPage);

export default Chapter;