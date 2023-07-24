import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonStateEventListener } from 'app/shared/state/shared-common.state/‏‏shared-common.selectors';
import { Subscription } from 'rxjs';
import { DialogModel } from './dialogModel';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit, OnDestroy {
  dialog: DialogModel = { title: '', content: null, style: null, visible: true };
  dialogChangedSub: Subscription
  constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef, commonStateEventListener: CommonStateEventListener) {
    this.dialogChangedSub = commonStateEventListener.selectDialog().subscribe((res: DialogModel) => {
      this.dialog.visible = res.visible;
      this.dialog.content = this.sanitizer.bypassSecurityTrustHtml(res.content)
      this.dialog.style = res.style;
      this.dialog.title = res.title;
      this._cdr.markForCheck();
    })
  }
  ngOnDestroy() {
    this.dialogChangedSub.unsubscribe();
  }
  ngOnInit(): void {
  }

}
