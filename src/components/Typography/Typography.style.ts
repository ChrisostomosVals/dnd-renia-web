import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { TypographyProps } from './Typography';
import { TypographyVariant } from './Typography.types';
import { ExtendedTheme, Theme } from '../../types/theme';
import { ColorVariantType } from '../../theme/color';

export const getTypographyStyles = (
  theme: Theme
): Record<TypographyVariant, FlattenSimpleInterpolation> => ({
  heading1: css`
    font-size: ${theme.typography.fontSize.base40};
    line-height: ${theme.typography.lineHeight.base32};
  `,
  heading2: css`
    font-size: ${theme.typography.fontSize.base18};
    line-height: ${theme.typography.lineHeight.base30};
  `,
  heading3: css`
    font-size: ${theme.typography.fontSize.base17};
    line-height: ${theme.typography.lineHeight.base30};
  `,
  heading4: css`
    font-size: ${theme.typography.fontSize.base16};
    line-height: ${theme.typography.lineHeight.base24};
  `,
  heading5: css`
    font-size: ${theme.typography.fontSize.base15};
    line-height: ${theme.typography.lineHeight.base24};
  `,
  heading6: css`
    font-size: ${theme.typography.fontSize.base14};
    line-height: ${theme.typography.lineHeight.base20};
  `,
  heading7: css`
    font-size: ${theme.typography.fontSize.base12};
    line-height: ${theme.typography.lineHeight.base20};
  `,
  paragraphLarge: css`
    font-size: ${theme.typography.fontSize.base16};
    line-height: ${theme.typography.lineHeight.base24};
  `,
  paragraphMedium: css`
    font-size: ${theme.typography.fontSize.base15};
    line-height: ${theme.typography.lineHeight.base24};
  `,
  paragraphSmallMedium: css`
    font-size: ${theme.typography.fontSize.base14};
    line-height: ${theme.typography.lineHeight.base20};
  `,
  paragraphSmall: css`
    font-size: ${theme.typography.fontSize.base12};
    line-height: ${theme.typography.lineHeight.base18};
  `,
});

export const getColour = (theme: Theme) => css`
  color: ${theme.color[theme.mode].text};
`;

export const getTypographyWeight = (theme: Theme) => ({
  regular: css`
    font-weight: ${theme.typography.fontWeight.regular};
  `,
  bold: css`
    font-weight: ${theme.typography.fontWeight.bold};
  `,
});

export const getCoreStyles = ({
  theme,
  variant,
  weight = 'regular',
}: ExtendedTheme<TypographyProps>) => css`
  font-family: ${theme.typography.fontFamily};
  ${getTypographyStyles(theme)[variant]};
  ${getTypographyWeight(theme)[weight]};
  ${getColour(theme)}
`;

export const Typography = styled.div<TypographyProps>`
  ${({
    theme,
    variant,
    weight = 'regular',
    align = 'left',
  }: ExtendedTheme<TypographyProps>) => css`
    font-family: ${theme.typography.fontFamily};
    ${align && `text-align: ${align};`}
    ${getTypographyStyles(theme)[variant]};
    ${getTypographyWeight(theme)[weight]};
    ${getColour(theme)}
  `}
`;
