import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationService } from 'app/shared/localization/localization.service';
import { FormMode, MessageTypes } from 'app/shared/model/enums';
import { CommonService } from 'app/shared/services/common.service';
import { AdvMessageService } from 'app/shared/services/message.service';
import { Observable, Subscription } from 'rxjs';
import { BaseComponent } from './base-component';


export abstract class SimpleBaseForm extends BaseComponent {

  constructor(messageService: AdvMessageService, localizationService: LocalizationService,
    protected route: ActivatedRoute, /*protected sideBarService: SideBarService,*/ protected cdr: ChangeDetectorRef, protected router: Router) {
    super(messageService, localizationService)
    // this.sideBarService.setContentDeActivate(this.canDeactivate.bind(this))
  }

  protected abstract get form(): NgForm;
  protected abstract save(args?: any): Observable<number>|null|undefined;

  protected subscriptions: Subscription = new Subscription();

  protected id: number

  get isNewEntity(): boolean { return !this.id };

  onDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  saveCompleted() { }


  //#region BaseComponent implementation
  isDirty() {
    return this.form?.form.dirty;
  }
  //#endregion


  markAsDirty() {
    if (this.form?.form) {
      this.form.form.markAsDirty();
    }
  }

  saveForm(args?: any) {
    if (!this.isValid()) {
      this.messageService.errorMessage('ERRORS.CANNOT_SAVE_INVALID_FORM', true)
      return;
    }
    else
      if (!this.isDirty()) {
        this.messageService.warningMessage('ERRORS.NO_CHANGES_TO_SAVE', true)
        return;
      }
      else {
        this.save(args)?.subscribe((id:number) => {
         if (!id) { return; }

          this.id = id;
          this.messageService.successMessage('GENERAL.MESSAGES.SAVED_SUCCESSFULLY', true);
          this.form.form.markAsPristine();
          this.form.form.markAsUntouched();
          this.saveCompleted();
        });
      }
  }

  private isValid() {
    if (this.form && !this.form.valid) {
      this.showErrors();
      return false;
    }
    else {
      return true;
    }
  }
  private showErrors() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
    });
  }
}
