import DateTimePicker from "react-datetime-picker";
import styled, { css } from "styled-components";

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

export const StyledDateTimePicker = styled(DateTimePicker)`
z-index: 100;
position: relative;
${({theme}) => css`
    color: ${theme.color[theme.mode].text};
    font-size: ${theme.spacing.base12};
    padding: ${theme.spacing.base8};
    border-bottom: ${theme.spacing.base4} solid ${theme.color[theme.mode].primary};
input {
    height: ${theme.spacing.base32};
    font-size: ${theme.spacing.base24};
    background-color: ${theme.color[theme.mode].backgroundColor};
    color: ${theme.color[theme.mode].text};
    outline: none;
    box-shadow: none;
    border: none;
    -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  }


  .react-datetime-picker__calendar {
    padding: ${theme.spacing.base24};
    font-size: ${theme.spacing.base24};
    text-align: center;
    border-radius: ${theme.spacing.base12};
    background-color: ${theme.color[theme.mode].header};
  }

  .react-datetime-picker__calendar--closed {
    display: none;
  }

  .react-datetime-picker__calendar button {
    border: none;
    background-color: ${theme.color[theme.mode].header};
    padding: ${theme.spacing.base24};
    color: ${theme.color[theme.mode].text};
    font-size: ${theme.spacing.base24};
    cursor: pointer;
    outline: none;
  }

  .react-datetime-picker__calendar button:hover {
    background-color:  ${theme.color[theme.mode].hover};
    border-radius: ${theme.spacing.base12};
  }

  .react-datetime-picker__calendar .react-calendar__tile--active {
    background-color: ${theme.color[theme.mode].primary};
    color:${theme.color[theme.mode].text};
    border-radius: ${theme.spacing.base12};
  }
  .react-calendar__month-view__weekdays{
    padding: ${theme.spacing.base24} 0;
  }
  .react-datetime-picker__calendar abbr {
    text-decoration: none;
  }
  .react-datetime-picker__button {
    position: absolute;
    background-color: transparent;
    border: none;
    top: ${theme.spacing.base0};
    right: ${theme.spacing.base0};
  }
  @media screen and (max-width: 768px) {

    font-size: ${({ theme }) => theme.spacing.base10};
  }

  @media screen and (max-width: 480px) {
    font-size: ${({ theme }) => theme.spacing.base8};
  }
`}
`;