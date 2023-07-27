import { FC, useEffect, useState } from "react";
import LocationModel from "../../../dist/models/LocationModel"
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Styled from "../styles/Form.style";
import Typography from "../../../components/Typography/Typography";
import { ErrorField } from "../../../components/Error/ErrorField";
import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../../components/Button/Button";
import { toast } from "react-toastify";
import LocationApi from "../../../dist/api/LocationApi";
import { LatLngLiteral } from "leaflet";
import UpdateLocationRequestModel from "../../../dist/models/UpdateLocationRequestModel";
import InsertLocationRequestModel from "../../../dist/models/InsertLocationRequestModel";

type LocationFormData = {
    location: LocationModel;
    newEvents: string[];
}

export const LocationForm:FC<{location?: LocationModel, position?: LatLngLiteral, onSuccess?: () => void}> = ({location, position, onSuccess}) => {
    const token = useSelector((state: RootState) => state.account.token);
    const url = useSelector((state: RootState) => state.settings.url);
    const [newEvents, setNewEvents] = useState<string[]>([]);
    const [deleteEvents, setDeleteEvents] = useState<string[]>([]);
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        reset,
      } = useForm<LocationFormData>({});
    useEffect(() => {
        if(location){
            reset({location: location});
        }
    }, [location])
    const handleCancel = (): void => {
        setNewEvents([]);
        setDeleteEvents([]);
    };
      const handleIncrement = (): void => {
        setNewEvents((event) => [...event, ""]);
      };
      const handleDecrement = (index: number): void => {
        setNewEvents((event) => event.filter((_, itemIndex) => itemIndex !== index));
      };
      const handleDeleteEvent = (item: string): void => {
        setDeleteEvents((event) => [...event, item]);
      };
      const onSubmit: SubmitHandler<LocationFormData> = async (
        data
      ): Promise<void> => {
         try{
          if(location?.id){
            const events: string[] = data.location.events?.filter((ev) => {
              return !deleteEvents.some((item) => item === ev);
            }) ?? [];
            if (!!newEvents.length) {
              events.push(...data.newEvents);
            }
            const request: UpdateLocationRequestModel = {
              id: location.id,
              time: data.location.time,
              date: data.location.date,
              season: data.location.season,
              year: data.location.year,
              events: events,
              x: position!.lng.toString(),
              y: position!.lat.toString()
            }
            const response = await LocationApi.UpdateAsync(token?.access_token ?? '', url, request)
            if(response.isError){
              console.log(response.error)
              toast.error('Failed to Update Location');
              return;
            }
            toast.success('Location Updated');
            if (onSuccess) {
              onSuccess();
            }
          }
          else{
            const request: InsertLocationRequestModel = {
              time: data.location.time,
              date: data.location.date,
              season: data.location.season,
              year: data.location.year,
              events: data.newEvents,
              x: position!.lng.toString(),
              y: position!.lat.toString()
            }
            const response = await LocationApi.CreateAsync(token?.access_token ?? '', url, request)
            if(response.isError){
              console.log(response.error)
              toast.error('Failed to Create Location');
              return;
            }
            toast.success('Location Created');
            if (onSuccess) {
              onSuccess();
            }
          }
         }
         catch(ex: any){
          console.log(ex)
          toast.error('Something Went Wrong');
         }
      };
    return( <Styled.AlterContainer>
        <Styled.StatsBox>
          <Styled.FormTitle>
            {!!location ? 
                <Typography variant="heading1">Edit</Typography>
            :
                <Typography variant="heading1">New</Typography>
            }
          </Styled.FormTitle>
          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`location.time`}
                      type="text"
                      placeholder="Time"
                      {...register(`location.time`, { required: true })}
                    />
                    <Styled.Label htmlFor={`location.time`}>Time</Styled.Label>
                    {errors?.location?.time && <ErrorField />}
                  </Styled.FormAreaContainer>
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`location.date`}
                      type="text"
                      placeholder="Date"
                      {...register(`location.date`, { required: true })}
                    />
                    <Styled.Label htmlFor={`location.date`}>Date</Styled.Label>
                    {errors?.location?.date && <ErrorField />}
                  </Styled.FormAreaContainer>
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`location.season`}
                      type="text"
                      placeholder="Season"
                      {...register(`location.season`, { required: true })}
                    />
                    <Styled.Label htmlFor={`location.season`}>Season</Styled.Label>
                    {errors?.location?.season && <ErrorField />}
                  </Styled.FormAreaContainer>
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`location.year`}
                      type="text"
                      placeholder="Year"
                      {...register(`location.year`, { required: true })}
                    />
                    <Styled.Label htmlFor={`location.year`}>Year</Styled.Label>
                    {errors?.location?.year && <ErrorField />}
                  </Styled.FormAreaContainer>
                  {(!!location && !!location.events?.length)
                  && location.events.map((ev, index) => (
                    <Styled.ItemContainer
                    key={ev + index}
                    opacity={deleteEvents.some((item) => item === ev) ? 0.3 : 1}
                    >
                    <Styled.FormAreaContainer>
                      <Styled.AlternativeTextArea
                        id={`feats.${index}`}
                        placeholder="Name"
                        {...register(`location.events.${index}`, { required: true })}
                      />
                      <Styled.Label htmlFor={`feats.${index}`}>Event</Styled.Label>
                      {errors?.location?.events?.[index] && <ErrorField />}
                    </Styled.FormAreaContainer>
                      <Styled.FormAreaContainer>
                    <Styled.ReactIcon>
                      <FaTrashAlt
                        size={20}
                        color="red"
                        onClick={() => handleDeleteEvent(ev)}
                      />
                    </Styled.ReactIcon>
                </Styled.FormAreaContainer>
                    </Styled.ItemContainer>
                  ))
                  }
                  {!!newEvents?.length
                  && newEvents.map((ev, index) => (
                    <Styled.ItemContainer
                    key={ev + index}
                    opacity={deleteEvents.some((item) => item === ev) ? 0.3 : 1}
                    >
                    <Styled.FormAreaContainer>
                      <Styled.AlternativeTextArea
                        id={`newEvents.${index}`}
                        placeholder="Name"
                        {...register(`newEvents.${index}`, { required: true })}
                      />
                      <Styled.Label htmlFor={`newEvents.${index}`}>Event</Styled.Label>
                      {errors?.location?.events?.[index] && <ErrorField />}
                    </Styled.FormAreaContainer>
                      <Styled.FormAreaContainer>
                    <Styled.ReactIcon>
                      <FaTrashAlt
                        size={20}
                        color="red"
                        onClick={() => handleDeleteEvent(ev)}
                      />
                    </Styled.ReactIcon>
                </Styled.FormAreaContainer>
                    </Styled.ItemContainer>
                  ))
                  }
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
      )
}