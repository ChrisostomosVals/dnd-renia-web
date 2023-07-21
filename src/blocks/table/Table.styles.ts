import styled, { css } from "styled-components";

export const Table = styled.table`
${({ theme }) => css`
  border-collapse: collapse;
  border-radius: ${theme.spacing.base12};
    overflow: hidden;
  width: 50vw;
  td,
  th {
    border: none;
    padding: ${theme.spacing.base12} ${theme.spacing.base32};
    }
  td {
    padding: ${theme.spacing.base12} ${theme.spacing.base32};
  }
  tbody tr {
    :nth-of-type(odd) {
        background-color: ${theme.color[theme.mode].tableRowOdd};
    }
    :nth-of-type(even) {
        background-color: ${theme.color[theme.mode].tableRowEven};
    }
    :hover {
      background-color: ${theme.color[theme.mode].hover};
    }
  }
  thead > tr {
    background-color: ${theme.color[theme.mode].tableHeader};
}
  `}
`;

