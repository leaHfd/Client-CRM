import { ElementRef } from '@angular/core';

export interface CustomColumnParams {}

export interface EnumColumnParams extends CustomColumnParams {
  enumType: any;
  enumName: string;
}

export interface ButtonColumnParams extends CustomColumnParams {
  text: string;
  clickCallback: (any) => any;
}
export interface CheckboxIconColumnParams extends CustomColumnParams {
  trueIcon: string;
  falseIcon: any;
  clickCallback: (any) => any;
}

export interface TemplateColumnParams extends CustomColumnParams {
  template: ElementRef<any>;
}
