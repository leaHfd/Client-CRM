import { EntityState } from "./enums";

export class BaseModel {
    EntityState: EntityState;
    constructor(entityState = EntityState.NotChanged) {
        this.EntityState = entityState;
    }
}
