import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { LocalizationService } from '../localization/localization.service';
import { PasswordViewPipe } from './password-view.pipe';
import { EnumPipe } from './enum.pipe';
import { ColumnType } from '../components/table/table-types/enums';
import { TableColumn } from '../components/table/table-types/table-column';
import { EnumColumnParams } from '../components/table/table-types/custom-column-params';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe, private enumTranslatePipe: EnumPipe, private datePipe: DatePipe,
    public localizationService: LocalizationService, private passwordViewPipe: PasswordViewPipe) {
  }
  math = Math;
  transform(items: any[], searchDefinitions: any[], searchTerm: string): any[] {

    if (!searchTerm || !searchDefinitions || !items ||
      searchDefinitions.filter(fd => fd.field && fd.searchFunc).length === 0) {
      return items;
    }

    searchDefinitions = searchDefinitions.filter(fd => fd.field && fd.searchFunc);
    return items.filter(item =>
      searchDefinitions.filter(fd =>
        fd.field && fd.searchFunc && fd.field in item && fd.searchFunc(item[fd.field], searchTerm)
      ).length > 0
    )
  }
  buildSearchDefinitions(fields: TableColumn[]) {
    return fields.map(f => ({ field: f.field, searchFunc: this.getFilterInstruction(f) }))
  }
  private getFilterInstruction(field: TableColumn) {
    let searchFunc;
    if (field.filterByDisplayValue) {
      switch (field.type) {
        case ColumnType.Enum:
          searchFunc = (value, searchText) => this.enumTranslatePipe.transform(value,
            (field.customColumnParams as EnumColumnParams).enumType).includes(searchText) ? true : false
          break;
        case ColumnType.Date:
          searchFunc = (value, searchText) => this.datePipe.transform(value, 'dd.MM.yy').includes(searchText) ? true : false
          break;
        default:
          searchFunc = (value, searchText) => value.toString().includes(searchText) ? true : false
          break;
      }
    }
    else {
      searchFunc = (value, searchText) => value.toString().includes(searchText) ? true : false
    }
    return searchFunc;
  }

}
export interface FieldDefinitions {
  field: string;
  filterByDisplayValue?: boolean;
  type?: ColumnType;
  enumType?: any;
  translateKey?: string;
}