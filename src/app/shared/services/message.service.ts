import { Injectable, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MessageTypes } from '../model/enums';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { LocalizationService } from '../localization/localization.service';

@Injectable()
export class AdvMessageService {

    @Output() onAddMessage: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _confirmationService: ConfirmationService, private _messageService: MessageService,
        private _localizationService: LocalizationService) {
    }

    showMessage(messageType: MessageTypes, title: string, message = null, life = 30000) {
        const msg = { severity: MessageTypes[messageType], summary: title, detail: message, life: life, sticky: false };
        this._messageService.add(msg)
        this.onAddMessage.emit();
    }

    warningMessage(message: string, shouldTranslate = false, life = 30000) {
        if (shouldTranslate) {
            message = this._localizationService.Translate(message);
        }
        this.showMessage(MessageTypes.warn, this._localizationService.Translate('GENERAL.MESSAGE'), message, life);
    }

    successMessage(message: string, shouldTranslate = false, translateParams: any = null, life = 30000) {
        if (shouldTranslate) {
            message = this._localizationService.Translate(message, translateParams);
        }
        this.showMessage(MessageTypes.success, this._localizationService.Translate('GENERAL.APPROVAL'), message, life);
    }

    errorMessage(message: string, shouldTranslate = false, life = 30000) {
        if (shouldTranslate) {
            message = this._localizationService.Translate(message);
        }
        this.showMessage(MessageTypes.error, this._localizationService.Translate('GENERAL.ERROR'), message, life);
    }
    showConfirmation(title: string, message: string,
        accept?: Function, reject?: Function,
        acceptVisible: boolean = true, rejectVisible: boolean = true) {
        this._confirmationService.confirm({
            message,
            header: title,
            icon: 'fa fa-question-circle',
            acceptLabel: this._localizationService.Translate('GENERAL.OK'),
            rejectLabel: this._localizationService.Translate('GENERAL.CANCEL'),
            accept: () => {
                if (accept !== null) {
                    accept();
                }
            },
            reject: () => {
                if (reject !== null) {
                    reject();
                }
            }
        });
        // this.messageService.clear();
        //this._messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
    }
}
