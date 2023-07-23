import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useNavigate, useParams } from "react-router-dom";
import UpdateCharacterDefinitionRequestModel from "../../../dist/models/UpdateCharacterDefinitionRequestModel";
import { updateCharacterFeats } from "../../../store/world/thunks";
import { toast } from "react-toastify";
import * as Styled from "../styles/Form.style";
import Typography from "../../../components/Typography/Typography";
import { ErrorField } from "../../../components/Error/ErrorField";
import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../../components/Button/Button";
import { Paths } from "../../../routes/paths";
import { FeatsFormData } from "../featsForm/FeatsForm.types";
import CharacterApi from "../../../dist/api/CharacterApi";

export const FeatsForm: FC = () => {
  const [name, setName] = useState<string>("");
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const user = useSelector((state: RootState) => state.account.user);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FeatsFormData>({});
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [feats, setFeats] = useState<string[]>([]);
  const [newFeats, setNewFeats] = useState<string[]>([]);
  const [deletedFeats, setDeletedFeats] = useState<string[]>([]);
  
  useEffect(() => {
    if(user && token && user.characterId){
      CharacterApi.GetByIdAsync(token.access_token, url, user.characterId).then(response => {
        if(response.isError){
          toast.error('Failed to fetch Gear');
        }
        else{
          setName(response.data!.name);
          setFeats(response.data!.feats ?? []);
          reset({ feats: response.data!.feats ?? [], newFeats: [] });
          setNewFeats([]);
          setDeletedFeats([]);
        }
      }).catch(error => {
        console.log(error)
        toast.error('Something went wrong');
      })
    }
  }, [user, token, reset, dispatch]);
  const handleCancel = (): void => {
    setNewFeats([]);
    setDeletedFeats([]);
    reset({ feats: feats ?? [] });
  };
  const handleIncrement = (): void => {
    setNewFeats((feat) => [...feat, ""]);
  };
  const handleDecrement = (index: number): void => {
    setNewFeats((feat) => feat.filter((_, itemIndex) => itemIndex !== index));
  };
  const handleDeleteFeat = (item: string): void => {
    setDeletedFeats((feat) => [...feat, item]);
  };
  const onSubmit: SubmitHandler<FeatsFormData> = async (
    data
  ): Promise<void> => {
      const updateFeats: string[] = data.feats.filter((feat) => {
          if(!!deletedFeats.length)
          return !deletedFeats.some((item) => item === feat);
          return feat;
        });
        if (!!newFeats.length) {
            updateFeats.push(...data.newFeats);
        }
    const request: UpdateCharacterDefinitionRequestModel<string> = {
      id: user?.characterId!,
      updateDefinition: updateFeats,
    };
    dispatch(
      updateCharacterFeats({
        token: token?.access_token ?? "",
        url: url,
        request,
      })
    ).then((response) => {
      if (response.type === "feats/rejected") {
        toast.error("Failed to update Feats");
      } else if (response.type === "feats/fulfilled") {
        toast.success("Feats Updated!");
        setFeats(updateFeats);
        reset({ feats: updateFeats, newFeats: [] });
        setNewFeats([]);
        setDeletedFeats([]);
      } else {
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <Styled.AlterContainer>
      <Styled.StatsBox>
        <Styled.FormTitle>
          {!!name && <Typography variant="heading1">{name}: Feats</Typography>}
        </Styled.FormTitle>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          {!!feats.length &&
            feats.map((feat, index) => (
              <Styled.ItemContainer
                key={feat + index}
                opacity={deletedFeats.some((item) => item === feat) ? 0.3 : 1}
              >
                <Styled.FormAreaContainer>
                  <Styled.Input
                    id={`feats.${index}`}
                    type="text"
                    placeholder="Name"
                    {...register(`feats.${index}`, { required: true })}
                  />
                  <Styled.Label htmlFor={`feats.${index}`}>Name</Styled.Label>
                  {errors?.feats?.[index] && <ErrorField />}
                </Styled.FormAreaContainer>
                <Styled.FormAreaContainer>
                  <Styled.ReactIcon>
                    <FaTrashAlt
                      size={20}
                      color="red"
                      onClick={() => handleDeleteFeat(feat)}
                    />
                  </Styled.ReactIcon>
                </Styled.FormAreaContainer>
              </Styled.ItemContainer>
            ))}
          {!!newFeats.length && (
            <Styled.FormAreaContainer>
              <Styled.FormTitle>
                <Typography variant="paragraphLarge" align="center">
                  Added Feats
                </Typography>
              </Styled.FormTitle>
              {newFeats.map((feat, index) => (
                <Styled.GearItemContainer key={feat + index} opacity={1}>
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`newFeats.${index}`}
                      type="text"
                      placeholder="Name"
                      {...register(`newFeats.${index}`, { required: true })}
                    />
                    <Styled.Label htmlFor={`newFeats.${index}`}>
                      Name
                    </Styled.Label>
                    {errors?.newFeats?.[index] && <ErrorField />}
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
