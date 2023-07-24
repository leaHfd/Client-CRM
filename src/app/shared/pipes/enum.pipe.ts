import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from "app/shared/localization/localization.service";

@Pipe({
    name: 'enumPipe'
})
export class EnumPipe implements PipeTransform {

    constructor(private localizationService: LocalizationService) { }
    transform(value: any, enumType: any, enumName?:any): any {
        if (!value) {
            return '';
        }
        return this.localizationService.TranslateEnum(value, enumType, enumName);
    }

}
