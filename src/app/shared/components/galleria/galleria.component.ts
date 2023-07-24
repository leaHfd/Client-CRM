import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
    selector: 'galleria',
    templateUrl: './galleria.component.html'
})
export class GalleriaComponent implements OnInit {
    
   @Input() images: any;
   @Input() mobileId: number;
   private _freeSearchText
   set freeSearchText(val: string) {
     if (this.freeSearchText != val) {
       this._freeSearchText = val;
       this.freeSearchTextChange.emit(val);
     }
   }
   get freeSearchText() { return this._freeSearchText }
   @Output() freeSearchTextChange: EventEmitter<string> = new EventEmitter<string>();
   
    responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    responsiveOptions2:any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    displayBasic: boolean;

    displayBasic2: boolean;

    displayCustom: boolean;

    activeIndex: number = 0;

    constructor() { }

    ngOnInit() {
      
    }

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
}
