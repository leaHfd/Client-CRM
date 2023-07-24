import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { BlockableUI } from 'primeng/api';

@Component({
    selector: 'app-blockable-div',
    template: `        
        <div [ngStyle]="style" [ngClass]="class" ><ng-content></ng-content></div>
    `
})
export class BlockableDivComponent implements BlockableUI {

    @Input() style: any;
    @Input() class: any;
   // @Input() pblockableDiv: ElementRef;
//     @Output() pblockableDivChange: EventEmitter<any> = new EventEmitter<any>();
//     private _pblockableDiv:any;
//     @Input() set pblockableDiv(val) {
//         this._pblockableDiv=val
//         this.pblockableDivChange.emit(this.pblockableDiv)
//     }
// get pblockableDiv(){return this._pblockableDiv}


        constructor(private el: ElementRef) {
}

getBlockableElement(): HTMLElement {
    var s = this.el.nativeElement.children[0];
    return this.el.nativeElement.children[0];
}

}
