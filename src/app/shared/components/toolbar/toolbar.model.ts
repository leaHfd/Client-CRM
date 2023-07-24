import { BtnActions } from "app/shared/model/enums";

export class ButtonSettings {
    type: BtnActions;
    label: string;
    visible: boolean;
    disabled: boolean;
    icon: string;
    classStyle: string;
    event?: any;
    eventArgs?: any;

    constructor(type, label, visible, disabled, icon, classStyle) {
        this.type = type;
        this.label = label;
        this.visible = visible;
        this.disabled = disabled;
        this.icon = icon;
        this.classStyle = classStyle;
    }
}

export const saveBtn = new ButtonSettings(BtnActions.SaveBtn, 'TOOLBAR.SAVE', true, false, 'pi pi-check', '');
export const cancelBtn = new ButtonSettings(BtnActions.CancelBtn, 'TOOLBAR.CANCEL', true, false, 'pi pi-times', 'p-button-success');
export const clearBtn = new ButtonSettings(BtnActions.ClearBtn, 'TOOLBAR.CLEAR', true, false, 'pi pi-eraser', 'p-button-danger');
export const newBtn = new ButtonSettings(BtnActions.NewBtn, 'TOOLBAR.NEW', true, false, 'pi pi-plus', 'p-button-warning');
export const closeBtn = new ButtonSettings(BtnActions.CloseBtn, 'TOOLBAR.CLOSE', true, false, 'pi pi-times', 'p-button-success');

export class ToolBarSettings {
    buttons: ButtonSettings[]

    constructor(buttons = []) {
        this.buttons = buttons;

    }
}