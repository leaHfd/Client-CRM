import { ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalizationService } from "app/shared/localization/localization.service";
import { FormMode } from "app/shared/model/enums";
import { AdvMessageService } from "app/shared/services/message.service";
import { Observable } from "rxjs";
// import { SideBarService } from "../services/side-bar.service";
import { SimpleBaseForm } from "./simple-base-form";

export abstract class BaseForm extends SimpleBaseForm {
    constructor(messageService: AdvMessageService, localizationService: LocalizationService,
        protected route: ActivatedRoute, /*protected sideBarService: SideBarService,*/ protected cdr: ChangeDetectorRef, protected router: Router) {
        super(messageService, localizationService, route, /*sideBarService,*/ cdr, router)
        this.subscriptions.add(this.route.url.subscribe(urlsubscriber => {
            this.id = this.route.snapshot.params["id"];
            this.changeMode()
        }));

    }
    protected abstract createNew();
    protected abstract loadData(): Observable<any>;

    public formModeEnum = FormMode;
    public formMode: FormMode;

    changeMode() {
        if (this.id) {
            this.formMode = FormMode.Edit;
            setTimeout(() => {
                this.loadData().subscribe(() => {
                    this.cdr.markForCheck();
                });
            }, 1);
        }
        else {
            this.formMode = FormMode.New;
            setTimeout(() => {
                const result = this.createNew();
                if (result?.subscribe) {
                    result.subscribe(() => {
                        this.cdr.markForCheck();
                    })
                }
                this.cdr.markForCheck();
            }, 1);
        }
    }
   
  saveCompleted() { 
    switch (this.formMode) {
          case FormMode.New:
            this.router.navigate([this.id], { relativeTo: this.route });
            break;
    }
  }

}