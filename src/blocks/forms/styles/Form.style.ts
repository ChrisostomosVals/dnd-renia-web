import styled, { css } from 'styled-components';

export const FormAreaContainer = styled.div`
${({ theme }) => css`  
  position: relative;
  padding: ${theme.spacing.base12} 0 0;
  margin-top: 10px;
`}
`;
export const CheckBoxAreaContainer = styled.div`
${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${theme.spacing.base12};
    padding-top: ${theme.spacing.base12};
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
${({ theme }) => css`  
display: flex;
  justify-content: center;
  position: relative;
  bottom: 0;
  padding-bottom: ${theme.spacing.base12};
  `}
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
export const CheckBox = styled.input`
${({ theme }) => css`
  accent-color:  ${theme.color[theme.mode].hover};
  transform: scale(1.5);
  cursor: pointer;
`}
`
export const CheckBoxLabel = styled.label`
${({ theme }) => css`
  font-size: 1rem;
  color: ${theme.color[theme.mode].text};
  cursor: pointer;
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
export const AlterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StatsBox = styled.div`
${({ theme }) => css`  
  display: flex;
  flex-direction: column;
  padding-top: ${theme.spacing.base32};
  `}
`
export const AlterForm = styled.form`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${theme.spacing.base16};
    padding: ${theme.spacing.base16};
    width: 50vw;
  `}
`;

export const Select = styled.select`
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
`

export const Option = styled.option`
${({ theme }) => css`
    background-color: ${theme.color[theme.mode].backgroundColor};
`}
`



export const SkillsForm = styled.form`
${({ theme }) => css`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.base32} 0;
  width: 50vw;
  `}
`
export const SkillsFormAreaContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: ${theme.spacing.base12};
    padding: ${theme.spacing.base12} 0;
    width: 100%;
    & > :nth-child(1) {
      grid-column: 1;
    }

    & > :nth-child(2) {
      grid-column: 2;
    }

    & > :nth-child(3) {
      grid-column: 3;
    }

    & > :nth-child(4) {
      grid-column: 4;
    }

    & > :nth-child(5) {
      grid-column: 5;
    }

    & > :nth-child(6) {
      grid-column: 6;
    }
  `}
`;

export const SkillContainer = styled.div`
  display: flex;
  align-items: center;
`
export const ReactIcon = styled.div`
${({theme}) => css`
    svg {
        color: ${theme.color[theme.mode].icon};
        padding: ${theme.spacing.base8};
    }
    svg:hover {
        color:  ${theme.color[theme.mode].iconHover};
        cursor: pointer;
    }`}
`;
export const IconsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Line = styled.hr`
  width: 50vw;
`;

export const Eye = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 50%;
    right: ${theme.spacing.base12};
    transform: translateY(-50%);
    cursor: pointer;
    svg {
      color: ${theme.color[theme.mode].icon};
      font-size: 1.3rem;
    }
  `}
`;