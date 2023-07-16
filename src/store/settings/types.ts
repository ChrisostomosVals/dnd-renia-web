import { ColorVariantType } from "../../theme/color";

export type SettingsState = {
    preferences: Preferences;
    url: string;
}

type Preferences = {
    themeMode: ColorVariantType;
}