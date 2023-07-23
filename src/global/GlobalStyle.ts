import { DefaultTheme, createGlobalStyle, css } from 'styled-components';
import { ExtendedTheme } from '../types/theme';

const GlobalStyle = createGlobalStyle<ExtendedTheme<DefaultTheme>>`
${({ theme }) => css`
body {
    background-color: ${theme.color[theme.mode].backgroundColor};
}
  `}
`;

export default GlobalStyle;
