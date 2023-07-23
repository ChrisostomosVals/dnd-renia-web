import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditUserFormData } from "./EditUserForm.types";
import { useParams } from "react-router-dom";
import UserModel from "../../../dist/models/UserModel";
import UserApi from "../../../dist/api/UserApi";
import { toast } from "react-toastify";
import Typography from "../../../components/Typography/Typography";
import * as Styled from "../styles/Form.style";
import { Button } from "../../../components/Button/Button";
import { ErrorField } from "../../../components/Error/ErrorField";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import UpdateUserRequestModel from "../../../dist/models/UpdateUserRequestModel";
import ChangePasswordRequestModel from "../../../dist/models/ChangePasswordModel";
export const EditUserForm: FC = () => {
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const characters = useSelector((state: RootState) => state.world.characters);
  const { id } = useParams();
  const [user, setUser] = useState<UserModel>();
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (id && token) {
      UserApi.GetByIdAsync(token.access_token, url, id).then((response) => {
        if (response.isError) {
          toast.error("Failed to fetch User");
        } else {
          setUser(response.data!);
          reset({ user: response.data! });
        }
      });
    }
  }, [token, id, characters]);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<EditUserFormData>({});
  const onSubmit: SubmitHandler<EditUserFormData> = async (
    data
  ): Promise<void> => {
    const request: UpdateUserRequestModel = {
      id: user?.id!,
      name: data.user.name,
      email: data.user.email,
      characterId: data.user.characterId,
    };
    const response = await UserApi.UpdateAsync(
      token?.access_token ?? "",
      url,
      request
    );
    if (response.isError) {
      console.log(response.error);
      toast.error("Failed to update user");
      return;
    }
    toast.success("User Updated");
    if (data.password) {
      const changePasswordRequest: ChangePasswordRequestModel = {
        newPassword: data.password,
      };
      const changePassword = await UserApi.ChangePasswordAsync(
        token?.access_token!,
        url,
        id!,
        changePasswordRequest
      );
      if (changePassword.isError) {
        console.log(changePassword.error);
        toast.error("Failed to update password");
        return;
      }
      toast.success("Password Updated!");
    }
  };

  return (
    <Styled.AlterContainer>
      <Styled.StatsBox>
        {user && (
          <>
            <Styled.FormTitle>
              <Typography variant="heading1">{user.name}</Typography>
            </Styled.FormTitle>
            <Styled.Form onSubmit={handleSubmit(onSubmit)}>
              <Styled.FormAreaContainer>
                <Styled.Input
                  id={`name`}
                  type="text"
                  placeholder={"Name"}
                  {...register(`user.name`, { required: true })}
                />
                <Styled.Label htmlFor={`name`}>Name</Styled.Label>
                {errors.user?.name && <ErrorField />}
              </Styled.FormAreaContainer>
              <Styled.FormAreaContainer>
                <Styled.Input
                  id={`email`}
                  type="text"
                  placeholder={"Email"}
                  {...register(`user.email`, { required: true })}
                />
                <Styled.Label htmlFor={`role`}>Email</Styled.Label>
                {errors.user?.email && <ErrorField />}
              </Styled.FormAreaContainer>
              <Styled.FormAreaContainer>
                <Styled.Input
                  id={`password`}
                  type={show ? "text" : "password"}
                  placeholder={"Password"}
                  {...register(`password`)}
                />
                <Styled.Label htmlFor={`password`}>Password</Styled.Label>
                {show ? (
                  <Styled.Eye>
                    <Styled.ReactIcon>
                      <FaEyeSlash onClick={() => setShow(false)} />
                    </Styled.ReactIcon>
                  </Styled.Eye>
                ) : (
                  <Styled.Eye>
                    <Styled.ReactIcon>
                      <FaEye onClick={() => setShow(true)} />
                    </Styled.ReactIcon>
                  </Styled.Eye>
                )}
              </Styled.FormAreaContainer>
              <Styled.FormAreaContainer>
                <Styled.Input
                  id={`role`}
                  type="text"
                  placeholder={"Role"}
                  disabled
                  {...register(`user.role`, { required: true })}
                />
                <Styled.Label htmlFor={`role`}>Role</Styled.Label>
                {errors.user?.role && <ErrorField />}
              </Styled.FormAreaContainer>
              <Styled.FormAreaContainer>
                <Styled.Select
                  id={`characterId`}
                  placeholder={"Character"}
                  {...register(`user.characterId`)}
                >
                  {!!characters.length &&
                    characters.map((character, index) => (
                      <Styled.Option
                        key={character.id}
                        value={character.id!}
                        label={character.name}
                      ></Styled.Option>
                    ))}
                </Styled.Select>
                <Styled.Label htmlFor={`characterId`}>
                  Assigned Character
                </Styled.Label>
              </Styled.FormAreaContainer>
              <Styled.FormFooter>
                <Button variant="primary" fullWidth={false}>
                  Submit
                </Button>
              </Styled.FormFooter>
            </Styled.Form>
          </>
        )}
      </Styled.StatsBox>
    </Styled.AlterContainer>
  );
};
