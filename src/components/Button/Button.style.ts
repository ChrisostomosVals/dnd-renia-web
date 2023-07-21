import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ButtonSizes, ButtonVariant } from './Button.types';
import { ButtonProps } from './ButtonProps';
import { ExtendedTheme, Theme } from '../../types/theme';

const getVariantStyles = (
  theme: Theme
): Record<ButtonVariant, FlattenSimpleInterpolation> => ({
  primary: css`
    background-color: ${theme.color[theme.mode].buttonPrimary};
    color: ${theme.color[theme.mode].buttonPrimaryText};
    &:disabled {
      opacity: 0.5;
    }
  `,
  secondary: css`
    background-color: ${theme.color[theme.mode].buttonSecondary};
    color: ${theme.color[theme.mode].buttonSecondaryText};
    &:disabled {
      opacity: 0.5;
    }
  `,
});

const getSizeStyles = (
  theme: Theme
): Record<ButtonSizes, FlattenSimpleInterpolation> => ({
  large: css`
    height: ${theme.spacing.base48};
  `,
  small: css`
    height: ${theme.spacing.base32};
  `,
});

export const Button = styled.button`
  ${({
    theme,
    variant = 'primary',
    size = 'large',
    fullWidth,
  }: ExtendedTheme<ButtonProps>) => css`
    font-family: ${theme.typography.fontFamily}
    font-weight: 800;
    padding: ${theme.spacing.base12} ${theme.spacing.base16};
    display: flex;
    align-items: center;
    font-size: 14px;
    border-radius: 7px;
    border: none;
    cursor: pointer;
    ${fullWidth && 'width: 100%;'}
    ${getVariantStyles(theme)[variant as ButtonVariant]};
    ${getSizeStyles(theme)[size as ButtonSizes]};

    &:disabled {
      cursor: default;
    }
    &:hover {
      box-shadow: ${theme.shadow[theme.mode].horizontal}
        ${theme.shadow[theme.mode].vertical} ${theme.shadow[theme.mode].blur}
        ${theme.shadow[theme.mode].color};
    }
  `}
`;

export const ButtonIcon = styled.span`
  display: flex;
  position: relative;
`;

export const OutlineIndicator = styled.div`
  width: 14px;
  height: 14px;
  position: absolute;
  border-radius: 50%;
  border: 3px solid red;
  right: -13px;
  top: -8px;
`;

export const Indicator = styled.div`
  width: 14px;
  height: 14px;
  background: red;
  position: absolute;
  border-radius: 50%;
  right: -13px;
  top: -8px;
`;

//TODO Investigate as Tech Debt
export const Mr = styled.span`
  ${({ theme }) => css`
    margin-right: ${theme.spacing.base24};
  `}
`;

//TODO Investigate as Tech Debt
export const Ml = styled.span`
  margin-left: 5px;
`;
