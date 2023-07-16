import { FC } from "react";
import * as Styled from "./Settings.styles";
import Typography from "../../components/Typography/Typography";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ColorVariantType } from "../../theme/color";
import settingsActions from "../../store/settings/actions";
const SettingsPage: FC = () => {
  const mode = useSelector(
    (state: RootState) => state.settings.preferences.themeMode
  );
  const dispatch = useDispatch();
  const handleThemeMode = (mode: ColorVariantType): void => {
    dispatch(settingsActions.changeTheme(mode));
  };
  return (
    <Styled.Container>
      <Styled.Title>
        <Typography variant="heading1">Settings</Typography>
      </Styled.Title>
      <Styled.SettingsArea>
        <Styled.Section>
          <Styled.Label selected={mode === "light"}>
          Light
            <Styled.Radio
              onChange={() => handleThemeMode("light")}
              checked={mode === "light"}
              type="radio"
            />
          </Styled.Label>
        </Styled.Section>
        <Styled.Section>
          <Styled.Label selected={mode === "dark"}>
            Dark
            <Styled.Radio
              onChange={() => handleThemeMode("dark")}
              checked={mode === "dark"}
              type="radio"
            />
          </Styled.Label>
        </Styled.Section>
      </Styled.SettingsArea>
    </Styled.Container>
  );
};

const Settings = AuthMiddleware(SettingsPage);

export default Settings;
