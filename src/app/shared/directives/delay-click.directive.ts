//This event supports in button that need to be activated after the binding of the last changed.
//This event runs the function with settimeout 
//For example: tables=>hgdttd (הגדרות לתעודות):if changed required file and click save button-sucssess save.
//This behavior is wrong becouse it's not need success save. but if use with this directiv - it's work good becouse
//the function run after the binding !!!

import { Directive, Input, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
@Directive({
  selector: '[delayClick]'
})

export class DelayClickDirective {
  constructor(private hostElement: ElementRef) {

  }
  @Output() delayClick: EventEmitter<any> = new EventEmitter();
  @HostListener('click', ['$event'])
  onClick(e) {
    setTimeout(() => {
      this.delayClick.next(e);
    }, 100);
  }
}  