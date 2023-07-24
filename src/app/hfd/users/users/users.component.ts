import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Lookups } from 'app/core/model/enums';
import { Lookup } from 'app/core/model/lookup.model';
import { LookupTableService } from 'app/core/services/lookupTable.service';
import { LookupsEventListener } from 'app/core/state/lookups.state/lookups.selectors';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ColumnType } from 'app/shared/components/table/table-types/enums';
import { TableColumn } from 'app/shared/components/table/table-types/table-column';
import {
  newBtn,
  ToolBarSettings,
} from 'app/shared/components/toolbar/toolbar.model';
import { LocalizationService } from 'app/shared/localization/localization.service';
import { TranslatedEnum } from 'app/shared/localization/translated-enums.enum';
import {
  BtnActions,
  ExpandMode,
  Role,
  SelectionMode,
  SortDirection,
} from 'app/shared/model/enums';
import { DynamicDialogService } from 'app/shared/services/dynamic-dialog.service';
import { filter, Observable, Subscription } from 'rxjs';
import { RecordStatus } from 'app/hfd/model/enums';
import { UserService } from 'app/hfd/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  recordStatus = RecordStatus;
  columns: TableColumn[];
  allUsers: any;
  users: any;
  departments$: Observable<Lookup[]>;
  SortDirection = SortDirection;
  selectedUsers: [];
  selectedDepartments: any;
  toolbarSettings: ToolBarSettings = new ToolBarSettings();
  selectedRow: any[];
  ExpandMode = ExpandMode;
  userId: number;
  dialogRef: DynamicDialogRef;

  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private _localizationService: LocalizationService,
    lookupTableService: LookupTableService,
    lookupsEventListener: LookupsEventListener,
    public commonService: DynamicDialogService
  ) {
    lookupTableService.loadLokups([Lookups.departments]);
    this.departments$ = lookupsEventListener.selectLookup(Lookups.departments);
  }

  private setToolbarSettings() {
    this.toolbarSettings.buttons = [newBtn];
  }

  ngOnInit(): void {
    this.setToolbarSettings();
    this.loadData();
  }

  onFilterChange(): void {
    let u = this.selectedUsers?.length > 0 ? this.selectedUsers : this.allUsers;
    this.users =
      this.selectedDepartments?.length > 0
        ? u.filter((u) =>
          this.selectedDepartments.some((d) =>
            u.departments.includes(d.description)
          )
        )
        : u;
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.columns = [
      {
        field: 'name',
        header: this._localizationService.Translate('USER.NAME'),
        sortable: true,
        type: ColumnType.Defualt,
        width: 3,
      },
      {
        field: 'status',
        header: this._localizationService.Translate('USER.STATUS'),
        sortable: true,
        type: ColumnType.Template,
        customColumnParams: { template: this.statusTemplate },
        width: 2,
      },
      {
        field: 'departments',
        header: this._localizationService.Translate('USER.DEPARTMENTS'),
        sortable: true,
        type: ColumnType.Defualt,
      },
    ];
  }

  doAction({ buttonKey, args }) {
    switch (buttonKey) {
      case BtnActions.NewBtn:
        break;
      default:
        break;
    }
  }

  onRowCollapseEvent() {
    this.userId = undefined;
  }

  OnRowExpandEvent(event) {
    this.userId = event.data.id;
    this.selectedRow = [event.data];
    this.cdr.markForCheck();
  }

  loadData() {
    //example
    // return this.userService.getAllUsers().subscribe((res: any) => {
    //   this.allUsers = res;
    //   this.users = res;
    //   this.users.map((obj) => {
    //     obj.departments = obj.departments
    //       ?.map((d) => d.description)
    //       .join(' , ');
    //     return obj;
    //   });
    //   this.onFilterChange();
    // });
  }

  ngOnDestroy() {
  }


  closeDialog() {
    this.dialogRef?.close();
    this.loadData();
  }
}
