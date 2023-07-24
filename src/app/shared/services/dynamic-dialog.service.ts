

import { Injectable, Type } from "@angular/core";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AppDynamicDialogComponent } from "../components/dynamic-dialog/dynamic-dialog.component";
import { ToolBarSettings } from "../components/toolbar/toolbar.model";

@Injectable()
export class DynamicDialogService {

    constructor(public dialogService: DialogService) {
    }
    public openDynamicDialog(component: Type<any>, config: DynamicDialogConfig): DynamicDialogRef {
        config.data = { data: config.data, component: component }
        let ref = this.dialogService.open(AppDynamicDialogComponent, config);
        return ref;
    }


}
