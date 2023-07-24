import { ComponentCanDeactivate } from "app/shared/guards/can-leave-component.guard";
import { LocalizationService } from "app/shared/localization/localization.service";
import { AdvMessageService } from "app/shared/services/message.service";

export abstract class BaseComponent implements ComponentCanDeactivate {

    constructor(protected messageService: AdvMessageService,protected localizationService:LocalizationService) { }
    //constructor(protected messageService:MessageService,protected localizationService:LocalizationService) { }
    //#region Abstract members & methods
    protected abstract isDirty(): boolean;
    //protected abstract clear();
    //#endregion

    //#region ComponentCanDeactivate implementation
    canDeactivate(): Promise<boolean> { 
        return new Promise((resolve) => {
            this.checkDirty().then((isDirty: boolean) => {
                if (!isDirty) {
                    //this.clear();
                    resolve(true);
                    return;
                }
                resolve(false);
            })
        });
    }
    //#endregion

    //#region Private Methods
    private checkDirty(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.isDirty()) {
               this.messageService.showConfirmation(this.localizationService.Translate('GENERAL.MESSAGE'),this.localizationService.Translate('FORMS.CANDEACTIVATE_MESSAGE'),  
                    () => {
                        resolve(false);
                    }, () => {
                        resolve(true);
                    });

            } else {
                resolve(false);
            }
        });
    }
    //#endregion
}