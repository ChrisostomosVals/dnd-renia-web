import styled, { css } from "styled-components";

export const Container = styled.div`
${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${theme.spacing.base12};
`}
`
export const Title = styled.div`
  ${({ theme }) => css`
  display: flex;
  justify-content: center;
  padding-top: ${theme.spacing.base32};
  `}
`;

export const Box = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 50vw;
${({ theme }) => css`
    gap: ${theme.spacing.base16};
    padding: ${theme.spacing.base16};
  `}
`;
export const StatContainer = styled.div`
${({ theme }) => css`  
  position: relative;
  padding: ${theme.spacing.base12} 0 0;
  margin-top: ${theme.spacing.base12};
`}
`;

export const Label = styled.label`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    font-weight: 700;
    color: ${theme.color[theme.mode].text};
  `}
`;
export const Input = styled.input`
  ${({ theme }) => css`
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: ${theme.spacing.base4} solid ${theme.color[theme.mode].primary};
    outline: 0;
    font-size: 1.3rem;
    color: ${theme.color[theme.mode].text};
    margin-top: ${theme.spacing.base4};
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
        color: ${theme.color[theme.mode].primary};
      }
      border-image-slice: 1;
    }

    &:required,
    &:invalid {
      box-shadow: none;
    }
  `}
`;
