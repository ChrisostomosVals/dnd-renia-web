import { FC, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormData } from "./LoginForm.types";
import * as Styled from "../styles/Form.style";
import Typography from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { ErrorField } from "../../../components/Error/ErrorField";
import { AuthContext } from "../../../providers/authProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../store/account/thunks";
import { AppDispatch } from "../../../store";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
export const LoginForm: FC = () => {
  const [error, setError] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { toggleAuthentication } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);
  const onSubmit: SubmitHandler<LoginFormData> = async (
    data
  ): Promise<void> => {
    dispatch(login({email: data.email, password: data.password, url: "http://localhost:4001/gateway"})
    ).then(response => {
      if(response.type === "login/rejected"){
        setError(true);
        reset();
      }
      else if (response.type === 'login/fulfilled'){
        toggleAuthentication(true);
        navigate('/');
      }
    });
  };
  return (
    <Styled.Container>
      <Styled.Box>
        <Styled.FormTitle>
          <Typography variant="heading1">Login</Typography>
        </Styled.FormTitle>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <Styled.FormAreaContainer>
          
          <Styled.Input
            id="email"
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <Styled.Label htmlFor="email">Email</Styled.Label>
          {errors.email && <ErrorField />}
          </Styled.FormAreaContainer>
        <Styled.FormAreaContainer>
          <Styled.Input
            id="password"
            type={show ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <ErrorField />}
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
        {error && <Typography variant="paragraphMedium">Invalid Email or Password</Typography>}
        </Styled.Form>
        <Styled.FormFooter>
          <Button
            variant="primary"
            fullWidth={false}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Styled.FormFooter>
        </Styled.Box>
        </Styled.Container>
  );
};
