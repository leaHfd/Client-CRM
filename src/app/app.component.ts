import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostListener, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from 'app/shared/localization/localization.service';
import { AdvMessageService } from './shared/services/message.service';
import { CommonStateEventListener } from './shared/state/shared-common.state/‏‏shared-common.selectors';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {
  constructor(private localizationService: LocalizationService, private commonStateEventListener: CommonStateEventListener,
    private messagesService: AdvMessageService, private changeRef: ChangeDetectorRef) {
    localizationService.InitializeLanguage();
  }
  @ViewChild('blockUIElement') blockUIElement: ElementRef;

  isLoading$: any;
  divElement: any;

  ngOnInit() {
    this.isLoading$ = this.commonStateEventListener.selectIsLoading();
    this.messagesService.onAddMessage.subscribe(() => {
      this.changeRef.detectChanges();
    });
  }
}
