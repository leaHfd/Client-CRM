import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { InputMode } from 'app/shared/model/enums';

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss']
})
export class AmountInputComponent implements OnInit {

  @ViewChild('amountInput') readInput: ElementRef<HTMLElement>
  @Input() maxAmount: { value: number, error: string };
  @Input() minAmount: { value: number, error: string };
  @Input() required: { value: boolean, error: string };

  _amount: number;
  @Output() amountChange = new EventEmitter();
  @Input() get amount(): number { return this._amount; }
  set amount(val: number) {
    this._amount = val;
    this.amountChange.emit(this.amount);
  }
  inputMode = InputMode.Reading;
  inputModeType = InputMode;
  amountText: string;
  constructor(private _cdr: ChangeDetectorRef) {

  }
  editing() {
    this.inputMode = this.inputModeType.Editing;
    // this.readInput.nativeElement.focus();
    this._cdr.markForCheck();
  }
  ngOnInit(): void {
    this.onlyReading()
  }
  onlyReading() {
    this.amountText = this.amount?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    this.inputMode = this.inputModeType.Reading;
  }

}
