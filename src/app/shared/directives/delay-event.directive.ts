

import { Directive, ElementRef, HostListener, Output, EventEmitter, Input } from '@angular/core';
@Directive({
  selector: '[delayEvent]'
})

export class DelayEventDirective {
  constructor(private hostElement: ElementRef) {
  }
  @Output() delayEvent: EventEmitter<any> = new EventEmitter();
  @Input() delayEventName: string


  ngAfterViewInit() {
    let timeout;
    this.hostElement.nativeElement[this.delayEventName] = (event) => {

      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = this.delayEvent.next(event);
      }, 1000);

    }
  }
}