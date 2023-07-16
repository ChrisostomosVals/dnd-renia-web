import { HTMLAttributes } from 'react';
import * as Styled from './Typography.style';
import {
  TypographyVariant,
  TypographyWeightVariant,
  TypographyAlignVariant,
} from './Typography.types';

export type TypographyProps = {
  variant: TypographyVariant;
  color?: string;
  weight?: TypographyWeightVariant;
  testID?: string;
  align?: TypographyAlignVariant;
} & HTMLAttributes<HTMLDivElement>;

const Typography = ({ children, testID, ...rest }: TypographyProps) => {
  return (
    <Styled.Typography data-testid={testID} {...rest}>
      {children}
    </Styled.Typography>
  );
};

export default Typography;
