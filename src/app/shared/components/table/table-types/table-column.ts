import { CustomColumnParams } from './custom-column-params';
import { ColumnType } from './enums';

export interface TableColumn {
  field: string;
  header: string;
  headerTranslateKey?: string;
  type: ColumnType;
  sortable: boolean;
  tooltip?: string;
  customColumnParams?: CustomColumnParams;
  hideColumn?: CallableFunction;
  style?: any[];
  cellClassRules?: { class: string; condition: (cellValue, row) => boolean }[];
  headerClass?: string;
  width?: number; //this value will be translated into match claa, for example: value 10 will be translated to ngClass='width-10'
  valueFormatter?: any;
  filterByDisplayValue?: boolean;
  onClick?: any;
  combinedFieldsNames?: string[];
}
