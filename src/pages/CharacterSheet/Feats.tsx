import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import { FeatsForm } from "../../blocks/forms/playerForms/FeatsForm";

export const FeatsSheetPage: FC = () => <FeatsForm />;

const FeatsSheet = RequireAuth(FeatsSheetPage);

export default FeatsSheet;
