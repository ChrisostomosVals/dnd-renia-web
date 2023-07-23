import { FC, useEffect, useState } from "react";
import StatModel from "../../../dist/models/StatModel";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Styled from "../styles/Form.style";
import Typography from "../../../components/Typography/Typography";
import { ErrorField } from "../../../components/Error/ErrorField";
import { Button } from "../../../components/Button/Button";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { updateCharacterStats } from "../../../store/world/thunks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatsFormData } from "../statsForm/StatsForm.types";
import CharacterModel from "../../../dist/models/CharacterModel";
import CharacterApi from "../../../dist/api/CharacterApi";
export const StatsForm: FC = () => {
  const [stats, setStats] = useState<StatModel[]>([]);
  const user =  useSelector((state: RootState) => state.account.user);
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
    if(user && token && user.characterId){
      CharacterApi.GetByIdAsync(token.access_token, url, user.characterId).then(response => {
        if(response.isError){
          toast.error('Failed to fetch Stats');
        }
        else{
          setName(response.data!.name);
          setStats(response.data!.stats ?? [])
          reset({ stats: response.data!.stats ?? [] });
        }
      }).catch(error => {
        console.log(error)
        toast.error('Something went wrong');
      })
    }
  }, [user, token, reset, dispatch]);
  const onSubmit: SubmitHandler<StatsFormData> = async (
    data
  ): Promise<void> => {
    dispatch(updateCharacterStats({token: token?.access_token ?? '', url: url, id: user?.characterId!, stats: data.stats}))
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
