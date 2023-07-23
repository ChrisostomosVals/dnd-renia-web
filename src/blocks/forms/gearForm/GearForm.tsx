import { FC, useEffect, useMemo, useState } from "react";
import * as Styled from "../styles/Form.style";
import { SubmitHandler, useForm } from "react-hook-form";
import { GearFormData, MoneyType } from "./GearForm.types";
import { useParams } from "react-router-dom";
import GearModel from "../../../dist/models/GearModel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Typography from "../../../components/Typography/Typography";
import { ErrorField } from "../../../components/Error/ErrorField";
import { Button } from "../../../components/Button/Button";
import { updateCharacterGear } from "../../../store/world/thunks";
import UpdateCharacterDefinitionRequestModel from "../../../dist/models/UpdateCharacterDefinitionRequestModel";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./GearForm.validation";
import { ErrorMessage } from "../../../components/Error/ErrorMessage";
import { FaPlusSquare, FaTrashAlt, FaCoins } from "react-icons/fa";

export const GearForm: FC = () => {
  const { id } = useParams();
  const [gear, setGear] = useState<GearModel[]>([]);
  const [newGear, setNewGear] = useState<GearModel[]>([]);
  const [deletedGear, setDeletedGear] = useState<GearModel[]>([]);
  const characters = useSelector((state: RootState) => state.world.characters);
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<GearFormData>({
    resolver: yupResolver<any>(validationSchema),
  });
  const totalWeight: string = useMemo(()=>{
    let total = 0;  
    gear.forEach((item)=> {
        const itemSplit = item.weight?.split(' ');
        if(itemSplit && !isNaN(Number(itemSplit[0]))){
            total += (Number(itemSplit[0]) * Number(item.quantity));
        }
    })
    return (total.toString() + " lbs.")
  }, [gear])
  const money: MoneyType = useMemo(() => {
    const moneyItem = gear.find((item) => {
      if (item.name === "Money") {
        return item;
      }
      return null;
    });
    if (moneyItem) {
      let moneyArr = moneyItem.quantity.toFixed(2);
      const gold = moneyArr.split(".")[0];
      const silver = moneyArr.split(".")[1]![0];
      const copper = moneyArr.split(".")[1]![1];
      const moneyObject: MoneyType = {
        id: moneyItem.id!,
        gold: gold!,
        silver: silver!,
        copper: copper!,
      };
      return moneyObject;
    }
    return {
      id: "",
      gold: "0",
      silver: "0",
      copper: "0",
    };
  }, [gear]);
  useEffect(() => {
    if (id) {
      const findCharacter = characters.find((character) => character.id === id);
      if (findCharacter) {
        setName(findCharacter.name);
        setGear(findCharacter.gear ?? []);
        reset({ gear: findCharacter.gear ?? [], newGear: [] });
        setNewGear([]);
        setDeletedGear([]);
      }
    }
  }, [id, characters]);
  const onSubmit: SubmitHandler<GearFormData> = async (data): Promise<void> => {
    const updateGear: GearModel[] = data.gear.filter((gear) => {
      return !deletedGear.some((deleteGear) => deleteGear.id === gear.id);
    });
    if (!!data.newGear.length) {
      updateGear.push(...data.newGear);
    }
    const request: UpdateCharacterDefinitionRequestModel<GearModel> = {
      id: id!,
      updateDefinition: updateGear,
    };
    dispatch(
      updateCharacterGear({
        token: token?.access_token ?? "",
        url: url,
        request,
      })
    ).then((response) => {
      if (response.type === "gear/rejected") {
        toast.error("Failed to update Gear");
      } else if (response.type === "gear/fulfilled") {
        toast.success("Gear Updated!");
      } else {
        toast.error("Something went wrong");
      }
    });
  };
  const handleIncrement = (): void => {
    setNewGear((gear) => [
      ...gear,
      { id: "", name: "", quantity: 1, weight: "-" },
    ]);
  };
  const handleDeleteGear = (gearItem: GearModel): void => {
    setDeletedGear((gear) => [...gear, gearItem]);
  };
  const handleDecrement = (index: number): void => {
    setNewGear((gear) => gear.filter((_, itemIndex) => itemIndex !== index));
  };
  const handleCancel = (): void => {
    setNewGear([]);
    setDeletedGear([]);
    reset({ gear: gear ?? [] });
  };
  return (
    <Styled.AlterContainer>
      <Styled.StatsBox>
        <Styled.FormTitle>
          {!!name && <Typography variant="heading1">{name}: Gear</Typography>}
        </Styled.FormTitle>
        <Styled.CoinsContainer>
          <Typography variant="heading2" weight="bold">{money.gold}</Typography>
          <FaCoins color="gold" />
          <Typography variant="heading2" weight="bold">{money.silver}</Typography>
          <FaCoins color="silver" />
          <Typography variant="heading2" weight="bold">{money.copper}</Typography>
          <FaCoins color="#b87333" />
        </Styled.CoinsContainer>
        <Typography variant="heading2" align="center" weight="bold">Total Weight {totalWeight}</Typography>
        <Styled.AlterForm onSubmit={handleSubmit(onSubmit)}>
          {!!gear.length &&
            gear.map((gearItem, index) => (
              <Styled.GearItemContainer
                key={gearItem.id + gearItem.name + index}
                opacity={
                  deletedGear.some((item) => item.id === gearItem.id) ? 0.3 : 1
                }
              >
                <Styled.FormAreaContainer>
                  <Styled.Input
                    id={`gear.${index}.name`}
                    type="text"
                    placeholder="Name"
                    {...register(`gear.${index}.name`, { required: true })}
                  />
                  <Styled.Label htmlFor={`gear.${index}.name`}>
                    Name
                  </Styled.Label>
                  {errors?.gear?.[index]?.name && <ErrorField />}
                </Styled.FormAreaContainer>
                <Styled.FormAreaContainer>
                  <Styled.Input
                    id={`gear.${index}.quantity`}
                    type="text"
                    placeholder="Quantity"
                    {...register(`gear.${index}.quantity`, { required: true })}
                  />
                  <Styled.Label htmlFor={`gear.${index}.quantity`}>
                    Quantity
                  </Styled.Label>
                  {errors?.gear?.[index]?.quantity && (
                    <ErrorMessage>
                      {errors.gear[index]?.quantity?.message}
                    </ErrorMessage>
                  )}
                </Styled.FormAreaContainer>
                <Styled.FormAreaContainer>
                  <Styled.Input
                    id={`gear.${index}.weight`}
                    type="text"
                    placeholder="Weight"
                    {...register(`gear.${index}.weight`, { required: true })}
                  />
                  <Styled.Label htmlFor={`gear.${index}.weight`}>
                    Weight
                  </Styled.Label>
                  {errors?.gear?.[index]?.weight && <ErrorField />}
                </Styled.FormAreaContainer>
                <Styled.FormAreaContainer>
                  <Styled.ReactIcon>
                    <FaTrashAlt
                      size={20}
                      color="red"
                      onClick={() => handleDeleteGear(gearItem)}
                    />
                  </Styled.ReactIcon>
                </Styled.FormAreaContainer>
              </Styled.GearItemContainer>
            ))}
          {!!newGear.length && (
            <Styled.FormAreaContainer>
              <Styled.FormTitle>
                <Typography variant="paragraphLarge" align="center">
                  Added Gear
                </Typography>
              </Styled.FormTitle>
              {newGear.map((gearItem, index) => (
                <Styled.GearItemContainer
                  key={gearItem.id + gearItem.name + index}
                  opacity={1}
                >
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`newGear.${index}.name`}
                      type="text"
                      placeholder="Name"
                      {...register(`newGear.${index}.name`, { required: true })}
                    />
                    <Styled.Label htmlFor={`newGear.${index}.name`}>
                      Name
                    </Styled.Label>
                    {errors?.newGear?.[index]?.name && <ErrorField />}
                  </Styled.FormAreaContainer>
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`newGear.${index}.quantity`}
                      type="text"
                      placeholder="Quantity"
                      {...register(`newGear.${index}.quantity`, {
                        required: true,
                      })}
                    />
                    <Styled.Label htmlFor={`newGear.${index}.quantity`}>
                      Quantity
                    </Styled.Label>
                    {errors?.newGear?.[index]?.quantity && (
                      <ErrorMessage>
                        {errors.newGear[index]?.quantity?.message}
                      </ErrorMessage>
                    )}
                  </Styled.FormAreaContainer>
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`newGear.${index}.weight`}
                      type="text"
                      placeholder="Weight"
                      {...register(`newGear.${index}.weight`, {
                        required: true,
                      })}
                    />
                    <Styled.Label htmlFor={`newGear.${index}.weight`}>
                      Weight
                    </Styled.Label>
                    {errors?.newGear?.[index]?.weight && <ErrorField />}
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
        </Styled.AlterForm>
        <Styled.IconsContainer>
          <Styled.ReactIcon onClick={handleIncrement}>
            <FaPlusSquare size={35} />
          </Styled.ReactIcon>
        </Styled.IconsContainer>
        <Styled.FormFooter>
          <Button variant="secondary" fullWidth={false} onClick={handleCancel}>
            Cancel
          </Button>
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
  );
};
