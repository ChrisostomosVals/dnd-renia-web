import * as color from './color';
import { ColorVariantType } from './color';
import * as spacing from './spacing';
import * as typography from './typography';
import * as shadows from './shadows';
const themeMode: {mode: ColorVariantType} ={
    mode: 'dark'
}
export const theme = {
    ...color,
    ...spacing,
    ...typography, 
    ...themeMode,
    ...shadows,
}

