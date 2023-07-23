import { useSelector } from "react-redux";
import RequireAuth from "../../access/RequireAuth";
import * as Styled from "./Chapters.styles";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import ChapterModel from "../../dist/models/ChapterModel";
import ChapterApi from "../../dist/api/ChapterApi";
import { toast } from "react-toastify";
import Table from "../../blocks/table/Table";
import { Paths } from "../../routes/paths";
import Typography from "../../components/Typography/Typography";
import { GiNotebook } from "react-icons/gi";
const ChaptersPage = () => {
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const [chapters, setChapters] = useState<ChapterModel[]>([]);
  useEffect(() => {
    if (token) {
      ChapterApi.GetAsync(token.access_token, url).then((response) => {
        if (response.isError) {
          console.log(response.error);
          toast.error("Failed to fetch Chapters");
          return;
        }
        setChapters(response.data!);
      });
    }
  }, [token]);
  return (
    <Styled.Container>
      <Styled.Title>
        <Typography variant="heading1">Chapters</Typography>
      </Styled.Title>
      <Styled.NavContainer>
        <Styled.IconLink to={Paths.NewChapter}>
          <Typography variant="paragraphLarge">New Chapter</Typography>
          <Styled.ReactIcon>
            <GiNotebook size={40} />
          </Styled.ReactIcon>
        </Styled.IconLink>
      </Styled.NavContainer>
      <Styled.TableContainer>
        {!!chapters.length && (
          <Table
            data={chapters.map((chapter, index) => ({
              id: chapter.id,
              Name: chapter.name,
              Date: new Date(chapter.date).toDateString(),
              path: `${Paths.Chapters}/${chapter.id}`,
            }))}
          />
        )}
      </Styled.TableContainer>
    </Styled.Container>
  );
};

const Chapters = RequireAuth(ChaptersPage);

export default Chapters;
