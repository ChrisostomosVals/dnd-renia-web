import { FC, useEffect } from "react";
import WorldObjectModel from "../../../dist/models/WorldObjectModel";
import { LatLngLiteral } from "leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Styled from "../styles/Form.style";
import { Button } from "../../../components/Button/Button";
import Typography from "../../../components/Typography/Typography";
import { ErrorField } from "../../../components/Error/ErrorField";
import UpdateWorldObjectRequestModel from "../../../dist/models/UpdateWorldObjectRequestModel";
import WorldObjectApi from "../../../dist/api/WorldObjectApi";
import { toast } from "react-toastify";
import CreateWorldObjectRequestModel from "../../../dist/models/CreateWorldObjectRequestModel";
type WorldObjectFormData = {
    worldObject: WorldObjectModel;
}
export const WorldObjectForm:FC<{worldObject?: WorldObjectModel, position?: LatLngLiteral, onSuccess?: () => void}> = ({worldObject, position, onSuccess}) => {
    const token = useSelector((state: RootState) => state.account.token);
    const url = useSelector((state: RootState) => state.settings.url);
    const types: string[] = [
        "Building" ,
        "Village",
        "Town",
        "City",
        "Site",
      ]; 
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        reset,
      } = useForm<WorldObjectFormData>({});
    useEffect(() => {
        if(worldObject){
            reset({worldObject: worldObject});
        }
    }, [worldObject])
    const onSubmit: SubmitHandler<WorldObjectFormData> = async (
        data
      ): Promise<void> => {
         try{
          if(worldObject?.id){
            const properties = worldObject.properties
            ? worldObject.properties.map((prop) =>
                prop.name === 'latitude'
                  ? { ...prop, value: position?.lat.toString() ?? prop.value }
                  : prop.name === 'longitude'
                  ? { ...prop, value: position?.lng.toString() ?? prop.value }
                  : prop
              )
            : [
                {
                  name: 'latitude',
                  value: position?.lat.toString() ?? '',
                },
                {
                  name: 'longitude',
                  value: position?.lng.toString() ?? '',
                },
              ];
            const request: UpdateWorldObjectRequestModel = {
              id: worldObject.id,
              name: data.worldObject.name,
              type: data.worldObject.type,
              description: data.worldObject.description,
              properties: properties
            }
            const response = await WorldObjectApi.UpdateAsync(token?.access_token ?? '', url, request)
            if(response.isError){
              console.log(response.error)
              toast.error('Failed to Update World Object');
              return;
            }
            toast.success('World Object Updated');
            if (onSuccess) {
              onSuccess();
            }
          }
          else{
            const request: CreateWorldObjectRequestModel = {
                name: data.worldObject.name,
                type: data.worldObject.type,
                description: data.worldObject.description,
                properties:[{
                    name: 'latitude',
                    value: position!.lng.toString()
                },
                {
                    name: 'longitude',
                    value: position!.lat.toString()
                }]
            }
            const response = await WorldObjectApi.CreateAsync(token?.access_token ?? '', url, request)
            if(response.isError){
              console.log(response.error)
              toast.error('Failed to Create World Object');
              return;
            }
            toast.success('World Object Created');
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
    return(
        <Styled.AlterContainer>
        <Styled.StatsBox>
          <Styled.FormTitle>
            {!!worldObject ? 
                <Typography variant="heading1">Edit</Typography>
            :
                <Typography variant="heading1">New</Typography>
            }
          </Styled.FormTitle>
          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`worldObject.name`}
                      type="text"
                      placeholder="Name"
                      {...register(`worldObject.name`, { required: true })}
                    />
                    <Styled.Label htmlFor={`worldObject.name`}>Name</Styled.Label>
                    {errors?.worldObject?.name && <ErrorField />}
                  </Styled.FormAreaContainer>
                  <Styled.FormAreaContainer>
                    <Styled.Select
                      id={`worldObject.type`}
                      placeholder="Type"
                      {...register(`worldObject.type`, { required: true })}
                    >
                    {types.map((type, index) => (
                        <Styled.Option
                            key={type + index}
                            value={type}
                            label={type}
                        />
                    ))}
                    </Styled.Select>
                    <Styled.Label htmlFor={`worldObject.type`}>Type</Styled.Label>
                    {errors?.worldObject?.type && <ErrorField />}
                  </Styled.FormAreaContainer>
                  <Styled.FormAreaContainer>
                    <Styled.Input
                      id={`worldObject.description`}
                      type="text"
                      placeholder="Season"
                      {...register(`worldObject.description`)}
                    />
                    <Styled.Label htmlFor={`worldObject.description`}>Description</Styled.Label>
                    {errors?.worldObject?.description && <ErrorField />}
                  </Styled.FormAreaContainer>
                  <Styled.FormFooter>
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