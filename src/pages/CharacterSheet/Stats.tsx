import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import { StatsForm } from "../../blocks/forms/playerForms/StatsForm";

export const StasSheetPage: FC = () => <StatsForm />;

const StatsSheet = RequireAuth(StasSheetPage);

export default StatsSheet;
