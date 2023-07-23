import { FC, useState } from "react";
import * as Styled from "../styles/Form.style";
import Typography from "../../../components/Typography/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangePasswordFormData } from "./ChangePasswordForm.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ErrorField } from "../../../components/Error/ErrorField";
import { Button } from "../../../components/Button/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import UserApi from "../../../dist/api/UserApi";
import ChangePasswordRequestModel from "../../../dist/models/ChangePasswordModel";
export const ChangePasswordForm: FC<{ id: string }> = ({ id }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({});
  const url = useSelector((state: RootState) => state.settings.url);
  const token = useSelector((state: RootState) => state.account.token?.access_token ?? "");
  const themeMode = useSelector((state: RootState) => state.settings.preferences.themeMode);
  const [show, setShow] = useState<boolean>(false);
  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (
    data
  ): Promise<void> => {
    try {
      const request:ChangePasswordRequestModel = data;
      const response = await UserApi.ChangePasswordAsync(token, url, id, request);
      if (response.isError) {
        toast.error("Failed to update password");
        return;
      }
      toast.success("Password updated!");
      reset();
      return;
  } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
      return;
  }
  };
  return (
    <Styled.AlterContainer>
      <Styled.StatsBox>
        <Styled.FormTitle>
          <Typography variant="heading1">Change Password</Typography>
        </Styled.FormTitle>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          <Styled.FormAreaContainer>
            <Styled.Input
              id="newPassword"
              type={show ? "text" : "password"}
              placeholder="New Password"
              {...register("newPassword", { required: true })}
            />
            {errors.newPassword && <ErrorField />}
            <Styled.Label htmlFor="password">Password</Styled.Label>
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
      <ToastContainer theme={themeMode} />
    </Styled.AlterContainer>
  );
};
