import { CompareType } from "app/shared/model/enums";

export interface ColumnFilter {
    field: string;
    operator: CompareType;
    value: string;
}