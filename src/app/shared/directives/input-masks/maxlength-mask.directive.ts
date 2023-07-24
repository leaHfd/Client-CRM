import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[maxlengthMask]'
})
export class MaxlengthMaskDirective {

  @Input() control: any;

  constructor(private el: ElementRef) {
  }

  @HostListener('input') onMouseLeave() {
    return this.mask();
  }
  
  mask() {
    if(this.control.errors?.maxlength) {
      this.control.patchValue(this.el.nativeElement.value.slice(0, this.control.errors?.maxlength.requiredLength));
    }
  }

}
