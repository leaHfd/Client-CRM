import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[AppAutofocus]'
})
export class AppAutofocus {

  _isFocused: boolean;
  @Input('AppAutofocus')
  set isFocused(value: boolean) {
    if (value != this._isFocused) {
      this._isFocused = value;
      if (this._isFocused && this.hostElement.nativeElement) {
        this.hostElement.nativeElement.focus();
      }
    }
  }
  constructor(private hostElement: ElementRef) { }
  ngAfterViewInit() {
    if (this._isFocused) {
      this.hostElement.nativeElement.focus();
    }
  }
}




