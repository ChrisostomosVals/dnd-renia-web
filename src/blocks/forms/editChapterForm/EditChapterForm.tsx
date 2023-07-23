import { FC, useEffect, useState } from "react";
import ChapterModel from "../../../dist/models/ChapterModel";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { toast } from "react-toastify";
import * as Styled from "../styles/Form.style";
import ChapterApi from "../../../dist/api/ChapterApi";
import { Button } from "../../../components/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "../../../components/Typography/Typography";
import { EditChapterFormData } from "./EditChapterForm.types";
import { FaTrashAlt } from "react-icons/fa";
import { ErrorField } from "../../../components/Error/ErrorField";
import { DateTimePicker } from "../../../components/DateTimePicker/DateTimePicker";
import { Value } from "react-datetime-picker/dist/cjs/shared/types";
import { CustomModal } from "../../../components/Modal/Modal";
import { Paths } from "../../../routes/paths";

export const EditChapterForm: FC = () => {
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const { id } = useParams();
  const [chapter, setChapter] = useState<ChapterModel>();
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EditChapterFormData>({});
  useEffect(() => {
    if (token) {
      ChapterApi.GetByIdAsync(token.access_token, url, id ?? "").then(
        (response) => {
          if (response.isError) {
            console.log(response.error);
            toast.error("Failed to fetch Chapter");
            return;
          }
          setChapter(response.data!);
          reset({ chapter: response.data! });
          setDate(new Date(response.data?.date!));
        }
      );
    }
  }, [token]);
  const onSubmit: SubmitHandler<EditChapterFormData> = async (
    data
  ): Promise<void> => {
    try {
      const response = await ChapterApi.UpdateAsync(
        token?.access_token ?? "",
        url,
        data.chapter
      );
      if (response.isError) {
        console.log(response.error);
        toast.error("Could not update chapter");
        return;
      }
      toast.success("Chapter Updated!");
      return;
    } catch (ex: any) {
      console.log(ex);
      toast.error("Something went wrong");
    }
  };
  const onChange = (value: Value) => {
    if (value) {
      setDate(value);
      setValue("chapter.date", value.toISOString());
    }
  };
  const Footer: FC = () => (
    <Styled.ModalFooter>
      <Button
        fullWidth={false}
        variant="secondary"
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
      <Button fullWidth={false} variant="primary" onClick={handleDelete}>
        Confirm
      </Button>
    </Styled.ModalFooter>
  );
  const handleDelete = async (): Promise<void> => {
    try {
      const response = await ChapterApi.DeleteAsync(
        token?.access_token ?? "",
        url,
        id!
      );
      if (response.isError) {
        console.log(response.error);
        toast.error("Could not delete chapter");
        return;
      }
      toast.success("Chapter Deleted!");
      navigate(Paths.Chapters);
      return;
    } catch (ex: any) {
      console.log(ex);
      toast.error("Something went wrong");
      return;
    }
  };
  return (
    <Styled.AlterContainer>
      <Styled.StatsBox>
        <Styled.FormTitle>
          {!!chapter && (
            <Typography variant="heading1">{chapter.name}</Typography>
          )}
        </Styled.FormTitle>
        {!!chapter && (
          <>
            <Styled.Form onSubmit={handleSubmit(onSubmit)}>
              <Styled.FormAreaContainer>
                <Styled.Input
                  id={`chapter.name`}
                  type="text"
                  placeholder="Name"
                  {...register(`chapter.name`, { required: true })}
                />
                <Styled.Label htmlFor={`chapter.name`}>Name</Styled.Label>
                {errors.chapter?.name && <ErrorField />}
              </Styled.FormAreaContainer>
              <Styled.FormAreaContainer>
                <DateTimePicker date={date} onChange={onChange} />
                <Styled.Label htmlFor={`chapter.date`}>Date</Styled.Label>
                {errors.chapter?.date && <ErrorField />}
              </Styled.FormAreaContainer>
              <Styled.FormAreaContainer>
                <Styled.TextArea
                  id={`chapter.story`}
                  spellCheck="false"
                  placeholder="Story"
                  {...register(`chapter.story`, { required: true })}
                />
                <Styled.Label htmlFor={`chapter.story`}>Story</Styled.Label>
                {errors.chapter?.story && <ErrorField />}
              </Styled.FormAreaContainer>
              <Styled.FormFooter>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setOpen(true)}
                  fullWidth={false}
                >
                  Delete
                </Button>
                <Button variant="primary" fullWidth={false}>
                  Submit
                </Button>
              </Styled.FormFooter>
            </Styled.Form>
          </>
        )}
      </Styled.StatsBox>
      <CustomModal open={open} footer={<Footer />}>
        <Typography align="center" variant="heading1">
          Are you sure you want to delete this Chapter?
        </Typography>
      </CustomModal>
    </Styled.AlterContainer>
  );
};
