import styled, { css } from 'styled-components';

export const FormAreaContainer = styled.div`
${({ theme }) => css`  
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
`}
`;

export const Form = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.base16};
    padding: ${theme.spacing.base16};
  `}
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormTitle = styled.div`
  display: flex;
  justify-content: center;
`;
export const FormFooter = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 0;
`;
export const Box = styled.div`
${({ theme }) => css`  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${theme.color[theme.mode].box};
  border-radius: 5px;
  height: 50%;
  width: 30%;
  `}
`
export const Input = styled.input`
  ${({ theme }) => css`
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid ${theme.color[theme.mode].primary};
    outline: 0;
    font-size: 1.3rem;
    color: ${theme.color[theme.mode].text};
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ ${Label} {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }

    &:focus {
      ~ ${Label} {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: ${theme.color[theme.mode].primary};
        font-weight: 700;
      }
      padding-bottom: 6px;
      font-weight: 700;
      border-width: 3px;
     
      border-image-slice: 1;
    }

    &:required,
    &:invalid {
      box-shadow: none;
    }
  `}
`;

export const Label = styled.label`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: ${theme.color[theme.mode].text};
  `}
`;
