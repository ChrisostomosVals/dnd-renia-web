import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { toast } from "react-toastify";
import * as Styled from "../styles/Form.style";
import ChapterApi from "../../../dist/api/ChapterApi";
import { Button } from "../../../components/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "../../../components/Typography/Typography";
import { ErrorField } from "../../../components/Error/ErrorField";
import { DateTimePicker } from "../../../components/DateTimePicker/DateTimePicker";
import { Value } from "react-datetime-picker/dist/cjs/shared/types";
import { NewChapterFormData } from "./NewChapterForm.types";
import { Paths } from "../../../routes/paths";

export const NewChapterForm: FC = () => {
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const [date, setDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<NewChapterFormData>({});

  const onSubmit: SubmitHandler<NewChapterFormData> = async (
    data
  ): Promise<void> => {
    try {
      const response = await ChapterApi.CreateAsync(
        token?.access_token ?? "",
        url,
        data.chapter
      );
      if (response.isError) {
        console.log(response.error);
        toast.error("Could not create chapter");
        return;
      }
      toast.success("Chapter created!");
      navigate(Paths.Chapters);
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

  return (
    <Styled.AlterContainer>
      <Styled.StatsBox>
        <Styled.FormTitle>
          <Typography variant="heading1">New Chapter</Typography>
        </Styled.FormTitle>
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
            <Button variant="primary" fullWidth={false}>
              Submit
            </Button>
          </Styled.FormFooter>
        </Styled.Form>
      </Styled.StatsBox>
    </Styled.AlterContainer>
  );
};
