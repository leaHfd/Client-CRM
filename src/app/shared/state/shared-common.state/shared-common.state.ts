import { DialogModel } from "app/shared/components/dialog/dialogModel";
import { Localization } from "app/shared/model/enums";

export interface ISharedCommonState {
    localization: Localization
    isLoading: boolean;
    dialog?: DialogModel;
}

let initialState: SharedCommonState = {
    localization: Localization.He,
    isLoading: false,
    dialog: { content: '', style: '', title: '', visible: false }
}

export class SharedCommonState implements ISharedCommonState {
    localization: Localization
    isLoading: boolean;
    dialog?: DialogModel;

    constructor() {
        this.localization = Localization.He,
            this.isLoading = false,
            this.dialog = { content: '', style: '', title: '', visible: false }
    }
}