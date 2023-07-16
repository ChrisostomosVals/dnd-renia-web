import { createGlobalStyle, css } from 'styled-components';
import { theme } from '../theme';

const GlobalStyle = createGlobalStyle<{theme: typeof theme} >`
${({ theme }) => css`
body {
    background-color: ${theme.color[theme.mode].backgroundColor};
}
  `}
`;

export default GlobalStyle;
