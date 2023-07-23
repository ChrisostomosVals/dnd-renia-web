import { FC, useEffect, useState } from "react";
import StatModel from "../../../dist/models/StatModel";
import { StatsFormData } from "./StatsForm.types";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Styled from "../styles/Form.style";
import Typography from "../../../components/Typography/Typography";
import { ErrorField } from "../../../components/Error/ErrorField";
import { Button } from "../../../components/Button/Button";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { updateCharacterStats } from "../../../store/world/thunks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const StatsForm: FC = () => {
  const [stats, setStats] = useState<StatModel[]>([]);
  const { id } = useParams();
  const characters = useSelector((state: RootState) => state.world.characters);
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<StatsFormData>({});
  const [name, setName] = useState<string>('')
  useEffect(() => {
    if(id){
      const findCharacter = characters.find(character => character.id === id);
      if(findCharacter){
        setName(findCharacter.name);
        setStats(findCharacter.stats ?? [])
        reset({ stats: findCharacter.stats ?? [] });
      }
  }
  }, [id, reset, characters, dispatch]);
  const onSubmit: SubmitHandler<StatsFormData> = async (
    data
  ): Promise<void> => {
    dispatch(updateCharacterStats({token: token?.access_token ?? '', url: url, id: id ?? '', stats: data.stats}))
    .then(response => {
      if(response.type === "stats/rejected"){
        toast.error("Failed to update Stats");
      }
      else if (response.type === 'stats/fulfilled'){
        toast.success("Stats Updated!");
      }
      else{
        toast.error("Something went wrong");
      }
    });
  }
  return (
  <Styled.AlterContainer>
      <Styled.StatsBox>
    <Styled.FormTitle>
          <Typography variant="heading1">{name}: Skills</Typography>
        </Styled.FormTitle>
        <Styled.AlterForm onSubmit={handleSubmit(onSubmit)}>
        {!!stats.length && 
            stats.map((stat, index) => (
              <Styled.FormAreaContainer key={stat.name + index}>
                <Styled.FormAreaContainer >
                    <Styled.Input
                    id={`stats.${index}.value`}
                    type="text"
                    placeholder={stat.name}
                    {...register(`stats.${index}.value`, { required: true })}
                    />
                    <Styled.Label htmlFor={`stats.${index}.value`}>{stat.name}</Styled.Label>
                    {errors?.stats?.[index]?.value && <ErrorField />}
                </Styled.FormAreaContainer>
                <Styled.CheckBoxAreaContainer key={stat.name + index}>
                  <Styled.CheckBoxLabel htmlFor={`stats.${index}.shown`}>Visible</Styled.CheckBoxLabel>
                  <Styled.CheckBox id={`stats.${index}.shown`} type="checkbox" {...register(`stats.${index}.shown`)}/>
                </Styled.CheckBoxAreaContainer>
                </Styled.FormAreaContainer>
            ))
        }
        </Styled.AlterForm>
        <Styled.FormFooter>
          <Button
            variant="primary"
            fullWidth={false}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Styled.FormFooter>
        </Styled.StatsBox>
  </Styled.AlterContainer>
  )
};
