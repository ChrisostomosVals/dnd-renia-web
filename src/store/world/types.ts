import CharacterModel from "../../dist/models/CharacterModel"
import ClassModel from "../../dist/models/ClassModel";
import LocationModel from "../../dist/models/LocationModel";
import RaceModel from "../../dist/models/RaceModel";
import WorldObjectModel from "../../dist/models/WorldObjectModel";

export type WorldState = {
    characters: CharacterModel[];
    worldObjects: WorldObjectModel[];
    locations: LocationModel[];
    races: RaceModel[];
    classes: ClassModel[];
}