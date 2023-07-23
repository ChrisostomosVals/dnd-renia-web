import styled, { DefaultTheme, css } from 'styled-components';

export const FormAreaContainer = styled.div`
${({ theme }) => css`  
  position: relative;
  padding: ${theme.spacing.base12} 0 0;
  margin-top: ${theme.spacing.base12};
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
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 0;
${({ theme }) => css`
  gap: ${theme.spacing.base32};
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

export const TextArea = styled.textarea`
  ${({ theme }) => css`
    font-family: inherit;
    max-width: 40vw;
    min-width: 40vw;
    min-height: 30vh;
    border: 0;
    border-bottom: ${theme.spacing.base4} solid ${theme.color[theme.mode].primary};
    outline: 0;
    font-size: 1.3rem;
    color: ${theme.color[theme.mode].text};
    margin-top: ${theme.spacing.base4};
    padding: ${theme.spacing.base12} 0;
    background: transparent;
    transition: border-color 0.2s;
    resize: vertical; /* Allow resizing only vertically */
    overflow: hidden;
    scrollbar-width: none; /* Hide the scrollbar in Firefox */
    -ms-overflow-style: none; /* Hide the scrollbar in IE and Edge */
    &::-webkit-scrollbar {
      width: 0; /* Hide the scrollbar in Chrome, Safari, and Opera */
    }
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
      overflow: auto;
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
    font-weight: 700;
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
  align-items: center;
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
    border-bottom: ${theme.spacing.base4} solid ${theme.color[theme.mode].primary};
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
      }
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
    & > * {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > :nth-child(1){
      justify-content: flex-start;
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
export const CoinsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ${({ theme }) => css`
    border-radius: ${theme.spacing.base12};
    background-color: ${theme.color[theme.mode].header};
    gap: ${theme.spacing.base12};
    padding: ${theme.spacing.base12};
    margin-top: ${theme.spacing.base12};
  `}
`;

export const Line = styled.hr`
  width: 50vw;
`;

export const Eye = styled.div`
    position: absolute;
    cursor: pointer;
    ${({ theme }) => css`
    bottom: ${theme.spacing.base0};
    right: ${theme.spacing.base12};
    svg {
      color: ${theme.color[theme.mode].icon};
      font-size: ${theme.spacing.base24};
    }
  `}
`;

export const GearItemContainer = styled.div<{theme: DefaultTheme, opacity: number;}>`
${({ theme, opacity }) => css`  
  display: flex;
  gap: ${theme.spacing.base12};
  opacity: ${opacity};
`}
`;

export const ItemContainer =  styled.div<{theme: DefaultTheme, opacity: number;}>`
${({ theme, opacity }) => css`  
  display: flex;
  gap: ${theme.spacing.base12};
  opacity: ${opacity};
`}
`;

export const ModalFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`