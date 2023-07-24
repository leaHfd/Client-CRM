import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, OnDestroy, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleBaseForm } from 'app/shared/base/simple-base-form';
import { LocalizationService } from 'app/shared/localization/localization.service';
import { BtnActions } from 'app/shared/model/enums';
import { AdvMessageService } from 'app/shared/services/message.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ToolBarSettings } from '../toolbar/toolbar.model';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDynamicDialogComponent implements OnInit, OnDestroy {
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  public compenentContainer: ViewContainerRef;

  toolbarSettings: ToolBarSettings;
  dialogForm: NgForm;
  data: any;

  constructor(protected cdr: ChangeDetectorRef, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  loadComponent() {
    const { data: { component, data, toolbarSettings } } = this.config;
    const componentRef = this.compenentContainer.createComponent(component)

    data && Object.keys(data).map(key => componentRef.instance[key] = data[key]);
    this.toolbarSettings = toolbarSettings;
    this.data = data;

    componentRef.instance['onClosed'] && componentRef.instance['onClosed'].subscribe(event =>
      this.ref.close(event)
    );

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadComponent();
  }

}
