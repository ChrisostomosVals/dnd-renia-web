import { FC, Fragment, useEffect, useState } from "react";
import SkillModel from "../../../dist/models/SkillModel";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Styled from "../styles/Form.style";
import Typography from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { updateCharacterSkills } from "../../../store/world/thunks";
import { ToastContainer, toast } from "react-toastify";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../../../theme";
import CharacterApi from "../../../dist/api/CharacterApi";
import { SkillsFormData } from "../skillsForm/SkillsForm.types";
export const SkillsForm: FC = () => {
  const [skills, setSkills] = useState<SkillModel[]>([]);
  const user =  useSelector((state: RootState) => state.account.user);
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const themeMode = useSelector(
    (state: RootState) => state.settings.preferences.themeMode
  );
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    getValues
  } = useForm<SkillsFormData>({});
  const [name, setName] = useState<string>("");
  useEffect(() => {
    if(user && token && user.characterId){
      CharacterApi.GetByIdAsync(token.access_token, url, user.characterId).then(response => {
        if(response.isError){
          toast.error('Failed to fetch Skills');
        }
        else{
          setName(response.data!.name);
          setSkills(response.data!.skills ?? [])
          reset({ skills: response.data!.skills ?? [] });
        }
      }).catch(error => {
        console.log(error)
        toast.error('Something went wrong');
      })
    }
  }, [user, reset, token, dispatch]);
  const handleIncrement = (skillIndex: number, property: 'miscMod' | 'ranks' | 'abilityMod') => {
    const currentValue = getValues(`skills.${skillIndex}.${property}`);
    setValue(`skills.${skillIndex}.${property}`, currentValue + 1);
    const updatedSkills = skills.map((skill, index) =>
    index === skillIndex ? { ...skill, [property]: currentValue + 1 } : skill
  );
  setSkills(updatedSkills);
  };

  const handleDecrement = (skillIndex: number, property: 'miscMod' | 'ranks' | 'abilityMod') => {
    const currentValue = getValues(`skills.${skillIndex}.${property}`);
    if(currentValue - 1 < 0 ) return;
    setValue(`skills.${skillIndex}.${property}`, currentValue - 1);
    const updatedSkills = skills.map((skill, index) =>
      index === skillIndex ? { ...skill, [property]: currentValue - 1 } : skill
    );
    setSkills(updatedSkills);
  };

  const onSubmit: SubmitHandler<SkillsFormData> = async (
    data
  ): Promise<void> => {
    console.log(data);
    dispatch(
      updateCharacterSkills({
        token: token?.access_token!,
        url: url,
        id: user?.characterId!,
        skills: data.skills,
      })
    ).then((response) => {
      if (response.type === "skills/rejected") {
        toast.error("Failed to update skills");
      } else if (response.type === "skills/fulfilled") {
        toast.success("Skills Updated!");
      } else {
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <Styled.AlterContainer>
      <Styled.StatsBox>
        <Styled.FormTitle>
          <Typography variant="heading1">{name}: Skills</Typography>
        </Styled.FormTitle>

        <Styled.SkillsForm onSubmit={handleSubmit(onSubmit)}>
        <Styled.SkillsFormAreaContainer>
        <Styled.SkillContainer>
           <Typography variant="heading2" weight="bold">
              Name
            </Typography>
            </Styled.SkillContainer>
        <Styled.SkillContainer>
            <Typography variant="heading2" weight="bold">
              Total Bonus
            </Typography>
            </Styled.SkillContainer>
        <Styled.SkillContainer>
            <Typography variant="heading2" weight="bold">
              Trained
            </Typography>
            </Styled.SkillContainer>
        <Styled.SkillContainer>
            <Typography variant="heading2" weight="bold">
              Ability Mod
            </Typography>
            </Styled.SkillContainer>
        <Styled.SkillContainer>
            <Typography variant="heading2" weight="bold">
              Ranks
            </Typography>
            </Styled.SkillContainer>
        <Styled.SkillContainer>
            <Typography variant="heading2" weight="bold">
              Misc. Mod
            </Typography>
            </Styled.SkillContainer>
          </Styled.SkillsFormAreaContainer>
          {!!skills.length &&
            skills.map((skill, index) => (
              <Fragment key={skill.name + index}>
                <Styled.SkillsFormAreaContainer>
                <Styled.SkillContainer>
                  <Typography variant="paragraphLarge">{skill.name}</Typography>
                  </Styled.SkillContainer>
                  <Styled.SkillContainer>
                  <Typography variant="paragraphLarge">
                    {skill.abilityMod + skill.ranks + skill.miscMod}
                  </Typography>
                  </Styled.SkillContainer>
                  <Styled.SkillContainer>
                  <Styled.CheckBox
                    id={`skills.${index}.trained`}
                    type="checkbox"
                    {...register(`skills.${index}.trained`)}
                  />
                  </Styled.SkillContainer>
                  <Styled.SkillContainer>
                    <Typography
                      variant="paragraphLarge"
                    >
                      {skill.abilityMod}
                    </Typography>
                    <Styled.IconsContainer>
                      <Styled.ReactIcon>
                        <FaAngleUp size={20} onClick={() => handleIncrement(index, `abilityMod`)}/>
                      </Styled.ReactIcon>
                      <Styled.ReactIcon>
                        <FaAngleDown size={20} onClick={() => handleDecrement(index, `abilityMod`)}/>
                      </Styled.ReactIcon>
                    </Styled.IconsContainer>
                  </Styled.SkillContainer>
                  <Styled.SkillContainer>
                    <Typography
                      variant="paragraphLarge"
                    >
                      {skill.ranks}
                    </Typography>
                    <Styled.IconsContainer>
                      <Styled.ReactIcon>
                        <FaAngleUp size={20} onClick={() => handleIncrement(index, `ranks`)}/>
                      </Styled.ReactIcon>
                      <Styled.ReactIcon>
                        <FaAngleDown size={20} onClick={() => handleDecrement(index, `ranks`)}/>
                      </Styled.ReactIcon>
                    </Styled.IconsContainer>
                  </Styled.SkillContainer>
                  <Styled.SkillContainer>
                    <Typography
                      variant="paragraphLarge"
                    >
                      {skill.miscMod}
                    </Typography>
                    <Styled.IconsContainer>
                      <Styled.ReactIcon>
                        <FaAngleUp size={20} onClick={() => handleIncrement(index, `miscMod`)}/>
                      </Styled.ReactIcon>
                      <Styled.ReactIcon>
                        <FaAngleDown size={20} onClick={() => handleDecrement(index, `miscMod`)}/>
                      </Styled.ReactIcon>
                    </Styled.IconsContainer>
                  </Styled.SkillContainer>
                </Styled.SkillsFormAreaContainer>
                <Styled.Line color={theme.color[themeMode].primary} />
              </Fragment>
            ))}
        </Styled.SkillsForm>
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
      <ToastContainer theme={themeMode} />
    </Styled.AlterContainer>
  );
};
