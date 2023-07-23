import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import UpdateCharacterDefinitionRequestModel from "../../../dist/models/UpdateCharacterDefinitionRequestModel";
import { updateCharacterSpecialAbilities } from "../../../store/world/thunks";
import { toast } from "react-toastify";
import * as Styled from "../styles/Form.style";
import Typography from "../../../components/Typography/Typography";
import { ErrorField } from "../../../components/Error/ErrorField";
import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../../components/Button/Button";
import { SpecialAbilitiesFormData } from "../specialAbilitiesForm/SpecialAbilitiesForm.types";
import CharacterApi from "../../../dist/api/CharacterApi";

export const SpecialAbilitiesForm: FC = () => {
  const [name, setName] = useState<string>("");
  const user = useSelector((state: RootState) => state.account.user);
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SpecialAbilitiesFormData>({});
  const dispatch = useDispatch<AppDispatch>();
  const [specialAbilities, setSpecialAbilities] = useState<string[]>([]);
  const [newAbilities, setNewAbilities] = useState<string[]>([]);
  const [deletedAbilities, setDeletedAbilities] = useState<string[]>([]);
  useEffect(() => {
    if(user && token && user.characterId){
      CharacterApi.GetByIdAsync(token.access_token, url, user.characterId).then(response => {
        if(response.isError){
          toast.error('Failed to fetch Special Abilities');
        }
        else{
          setName(response.data!.name);
          setSpecialAbilities(response.data!.specialAbilities ?? []);
          reset({ specialAbilities: response.data!.specialAbilities ?? [], newAbilities: [] });
          setNewAbilities([]);
          setDeletedAbilities([]);
        }
      }).catch(error => {
        console.log(error)
        toast.error('Something went wrong');
      })
    }
  }, [user, reset, token, dispatch]);
  const handleCancel = (): void => {
    setNewAbilities([]);
    setDeletedAbilities([]);
    reset({ specialAbilities: specialAbilities ?? [] });
  };
  const handleIncrement = (): void => {
    setNewAbilities((ability) => [...ability, ""]);
  };
  const handleDecrement = (index: number): void => {
    setNewAbilities((ability) => ability.filter((_, itemIndex) => itemIndex !== index));
  };
  const handleDeleteFeat = (item: string): void => {
    setDeletedAbilities((ability) => [...ability, item]);
  };
  const onSubmit: SubmitHandler<SpecialAbilitiesFormData> = async (
    data
  ): Promise<void> => {
      const updateAbilities: string[] = data.specialAbilities.filter((ability) => {
          return !deletedAbilities.some((item) => item === ability);
        });
        if (!!newAbilities.length) {
            updateAbilities.push(...data.newAbilities);
        }
    const request: UpdateCharacterDefinitionRequestModel<string> = {
      id: user?.characterId!,
      updateDefinition: updateAbilities,
    };
    dispatch(
      updateCharacterSpecialAbilities({
        token: token?.access_token ?? "",
        url: url,
        request,
      })
    ).then((response) => {
      if (response.type === "special-abilities/rejected") {
        toast.error("Failed to update Special Abilities");
      } else if (response.type === "special-abilities/fulfilled") {
        toast.success("Special Abilities Updated!");
        setSpecialAbilities(updateAbilities);
        reset({ specialAbilities: updateAbilities, newAbilities: [] });
        setNewAbilities([]);
        setDeletedAbilities([]);
      } else {
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <Styled.AlterContainer>
      <Styled.StatsBox>
        <Styled.FormTitle>
          {!!name && <Typography variant="heading1" >{name}: Special Abilities</Typography>}
        </Styled.FormTitle>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          {!!specialAbilities.length &&
            specialAbilities.map((ability, index) => (
              <Styled.ItemContainer
                key={ability + index}
                opacity={deletedAbilities.some((item) => item === ability) ? 0.3 : 1}
              >
                <Styled.FormAreaContainer>
                  <Styled.Input
                    id={`feats.${index}`}
                    type="text"
                    placeholder="Name"
                    {...register(`specialAbilities.${index}`, { required: true })}
                  />
                  <Styled.Label htmlFor={`specialAbilities.${index}`}>Name</Styled.Label>
                  {errors?.specialAbilities?.[index] && <ErrorField />}
                </Styled.FormAreaContainer>
                <Styled.FormAreaContainer>
                  <Styled.ReactIcon>
                    <FaTrashAlt
                      size={20}
                      color="red"
                      onClick={() => handleDeleteFeat(ability)}
                    />
                  </Styled.ReactIcon>
                </Styled.FormAreaContainer>
              </Styled.ItemContainer>
            ))}
          {!!newAbilities.length && (
            <Styled.FormAreaContainer>
              <Styled.FormTitle>
                <Typography variant="paragraphLarge" align="center">
                  Added Abilities
                </Typography>
              </Styled.FormTitle>
              {newAbilities.map((ability, index) => (
                <Styled.GearItemContainer key={ability + index} opacity={1}>
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`newFeats.${index}`}
                      type="text"
                      placeholder="Name"
                      {...register(`newAbilities.${index}`, { required: true })}
                    />
                    <Styled.Label htmlFor={`newFeats.${index}`}>
                      Name
                    </Styled.Label>
                    {errors?.newAbilities?.[index] && <ErrorField />}
                  </Styled.FormAreaContainer>
                  <Styled.FormAreaContainer>
                    <Styled.ReactIcon onClick={() => handleDecrement(index)}>
                      <FaTrashAlt size={20} color="red" />
                    </Styled.ReactIcon>
                  </Styled.FormAreaContainer>
                </Styled.GearItemContainer>
              ))}
            </Styled.FormAreaContainer>
          )}
          <Styled.IconsContainer>
            <Styled.ReactIcon onClick={handleIncrement}>
              <FaPlusSquare size={35} />
            </Styled.ReactIcon>
          </Styled.IconsContainer>
          <Styled.FormFooter>
            <Button
              variant="secondary"
              fullWidth={false}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth={false}
            >
              Submit
            </Button>
          </Styled.FormFooter>
        </Styled.Form>
      </Styled.StatsBox>
    </Styled.AlterContainer>
  );
};
