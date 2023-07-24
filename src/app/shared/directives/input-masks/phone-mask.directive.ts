import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[phoneMask]'
})
export class PhoneMaskDirective {

  @Input() control: any;
  @Input() is: any;
  private value: any; 

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.value = this.control.value;
  }

  @HostListener('input') onChange() {  //when a change happens save the value in a variable
    this.value = this.control.value;   
  }

  @HostListener('blur') onBlur() { //when lost the focus call format function
    this.mask();
  }

  @HostListener('focus') onFocus() { //when get the focus recover the true value
    this.control.value = this.value;
  }

  mask() {
    if(this.is == "phone") {
      let val = this.control.value;
      let len = val.length;
      this.el.nativeElement.value = 
          (len <= 3) ? this.control.value :
          (len <= 7) ? (this.control.value.slice(0,3) + ' ' + this.control.value.slice(3,7)):
                        (this.control.value.slice(0,3) + ' ' + this.control.value.slice(3,7));
    }
  }
}
