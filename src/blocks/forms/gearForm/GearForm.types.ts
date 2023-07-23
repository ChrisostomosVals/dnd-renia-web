import GearModel from "../../../dist/models/GearModel"

export type GearFormData = {
    gear: GearModel[];
    newGear: GearModel[];
}
export type MoneyType = {
    id: string;
    gold: string;
    silver: string;
    copper: string;
}