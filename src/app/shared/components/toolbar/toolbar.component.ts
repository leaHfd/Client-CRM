import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToolBarSettings } from './toolbar.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  private _toolBarSettings: ToolBarSettings = new ToolBarSettings();

  @Output() buttonClicked = new EventEmitter();

  @Input() args: any;

  @Input() get toolBarSettings(): ToolBarSettings { return this._toolBarSettings; }
  set toolBarSettings(v: ToolBarSettings) {
    this._toolBarSettings = v;
  }

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  btnClick(event, buttonKey) {
    this.buttonClicked.emit({ buttonKey, args: this.args });
  }

}
