import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Localization } from '../model/enums';
import { CommonStateRaiseEvents } from '../state/shared-common.state/shared-common.actions';

@Injectable()
export class LocalizationService {
    OnChangeLanguage = new EventEmitter();

    constructor(private translate: TranslateService, private commonStateRaiseEvent: CommonStateRaiseEvents) {
    }

    Translate(value: string, params: any = {}) {
        return this.translate.instant(value, params);
    }
    TranslateAsync(value: string, params: any = {}) {
        return this.translate.get(value, params);
    }
    TranslateEnum(value: number, enumType: any, customEnumName: string = null): Observable<string> {
        const enumName = customEnumName;
        if (Object.values(enumType).includes(value)) {
            return this.translate.get(`ENUMS.${enumName}.${enumType[value]}`); //translate.instant dont work with nested values more then 2 levels, so should use async trnslate.get method
        }
        return null;
    }

    changeLanguage(localization: Localization) {
        this.commonStateRaiseEvent.setLocalization(localization);
        this.translate.use(localization);
        this.OnChangeLanguage.emit();
    }

    InitializeLanguage() {
        let language = Localization.He;
        this.translate.setDefaultLang(language);
        this.changeLanguage(language);
    }
}
