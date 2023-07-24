import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[OnlyNumber]'
})
export class OnlyNumber {

    constructor(private el: ElementRef) { }

   // @Input() OnlyNumber: boolean;

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent>event;
       // if (this.OnlyNumber) {

            if (["Delete", "Backspace", "Tab", "Escape", "Enter", "DecimalPoint", ".", "Subtract"].indexOf(e.key) !== -1 ||
                // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (["a", "c", "v", "x"].indexOf(e.key) !== -1 && (e.ctrlKey || e.metaKey)) ||
                // Allow: home, end, left, right
                (["End", "Home", "ArrowLeft", "ArrowUp", "ArrowRight"].indexOf(e.key) !== -1 && (e.ctrlKey || e.metaKey))) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(e.key) === -1) && ["Numpad0", "Numpad1", "Numpad2", "Numpad3", "Numpad4", "Numpad5", "Numpad6", "Numpad7", "Numpad8", "Numpad9"].indexOf(e.key) === -1) {
                e.preventDefault();
            }
      //  }
    }
}