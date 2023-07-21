import { FC, useEffect } from "react";
import * as Styled from "../styles/Form.style";
import Typography from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorField } from "../../../components/Error/ErrorField";
import { createCharacter } from "../../../store/world/thunks";
import CreateCharacterRequestModel from "../../../dist/models/CreateCharacterRequestModel";
import { ToastContainer, toast } from "react-toastify";

type NewCharacterFormData = {
  name: string;
  type: string;
  classId: string;
  raceId: string;
  visible: boolean;
};
export const NewCharacterForm: FC = () => {
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const classes = useSelector((state: RootState) => state.world.classes);
  const races = useSelector((state: RootState) => state.world.races);
  const themeMode = useSelector(
    (state: RootState) => state.settings.preferences.themeMode
  );
  const dispatch = useDispatch<AppDispatch>();
  const types: string[] = ["HERO", "NPC", "HOSTILE", "BOSS"];
  useEffect(() => {}, []);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<NewCharacterFormData>({});
  const onSubmit: SubmitHandler<NewCharacterFormData> = async (
    data
  ): Promise<void> => {
    const request: CreateCharacterRequestModel = data;
    dispatch(
      createCharacter({ token: token?.access_token ?? "", url, request })
    ).then((response) => {
      if (response.type === "createCharacter/rejected") {
        toast.error("Failed to create Character");
      } else if (response.type === "createCharacter/fulfilled") {
        toast.success("Character created!");
        reset();
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Styled.AlterContainer>
      <Styled.StatsBox>
        <Styled.FormTitle>
          <Typography variant="heading1">Create New Character</Typography>
        </Styled.FormTitle>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          <Styled.FormAreaContainer>
            <Styled.Input
              id={`name`}
              type="text"
              placeholder={"Name"}
              {...register(`name`, { required: true })}
            />
            <Styled.Label htmlFor={`name`}>Name</Styled.Label>
            {errors.name && <ErrorField />}
          </Styled.FormAreaContainer>
          <Styled.FormAreaContainer>
            <Styled.Select
              id={`type`}
              placeholder={"Choose Type"}
              {...register(`type`, { required: true })}
            >
              {types.map((type, index) => (
                <Styled.Option
                  key={type + index}
                  value={type}
                  label={type}
                ></Styled.Option>
              ))}
            </Styled.Select>
            <Styled.Label htmlFor={`type`}>Choose Type</Styled.Label>
            {errors.type && <ErrorField />}
          </Styled.FormAreaContainer>
          <Styled.FormAreaContainer>
            <Styled.Select
              id={`raceId`}
              placeholder={"Race"}
              {...register(`raceId`, { required: true })}
            >
              {!!races.length &&
                races.map((race, index) => (
                  <Styled.Option
                    key={race.id}
                    value={race.id}
                    label={race.name}
                  ></Styled.Option>
                ))}
            </Styled.Select>
            <Styled.Label htmlFor={`raceId`}>Choose Race</Styled.Label>
            {errors.raceId && <ErrorField />}
          </Styled.FormAreaContainer>
          <Styled.FormAreaContainer>
            <Styled.Select
              id={`classId`}
              placeholder={"Choose Class"}
              {...register(`classId`, { required: true })}
            >
              {!!classes.length &&
                classes.map((cl, index) => (
                  <Styled.Option
                    key={cl.id}
                    value={cl.id}
                    label={cl.name}
                  ></Styled.Option>
                ))}
            </Styled.Select>
            <Styled.Label htmlFor={`classId`}>Choose Class</Styled.Label>
            {errors.classId && <ErrorField />}
          </Styled.FormAreaContainer>
          <Styled.CheckBoxAreaContainer>
            <Styled.CheckBoxLabel htmlFor={`visible`}>
              Visible
            </Styled.CheckBoxLabel>
            <Styled.CheckBox
              id={`visible`}
              type="checkbox"
              {...register(`visible`)}
            />
          </Styled.CheckBoxAreaContainer>
          <Styled.FormFooter>
            <Button variant="primary" fullWidth={false}>
              Submit
            </Button>
          </Styled.FormFooter>
        </Styled.Form>
      </Styled.StatsBox>
      <ToastContainer theme={themeMode} />
    </Styled.AlterContainer>
  );
};
