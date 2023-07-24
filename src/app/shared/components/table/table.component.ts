import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ExpandMode, SelectionMode, SortDirection } from 'app/shared/model/enums';
import { FilterPipe } from 'app/shared/pipes/filter.pipe';
import { FilterMetadata, LazyLoadEvent } from 'primeng/api';
import { ColumnType } from './table-types/enums';
import { TableColumn } from './table-types/table-column';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  constructor(private filterPipe: FilterPipe) { }

  @ViewChild('dt', { static: false }) table: any;
  public loading: boolean;
  public ColumnType = ColumnType;

  private _itemsSource: any[];
  @Input() title?: string;
  @Input()
  public get itemsSource(): any[] {
    return this._itemsSource;
  }
  public set itemsSource(value: any[]) {
    this._itemsSource = value;
  }
  _selectedItems: any[] = [];
  @Output() selectedItemsChange = new EventEmitter();
  @Input() get selectedItems(): any[] { return this._selectedItems; }
  set selectedItems(val: any[]) {
    this._selectedItems = val;
    this.selectedItemsChange.emit(this.selectedItems);
  }
  _filters: { [s: string]: FilterMetadata };
  @Output() filtersChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() get filters(): { [s: string]: FilterMetadata } { return this._filters; }
  set filters(filters: { [s: string]: FilterMetadata }) {
    this._filters = filters;
    this.filtersChange.emit(filters);
  }
  _pageSize: number = 100;
  @Output() pageSizeChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() get pageSize(): number { return this._pageSize; }
  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
    this.pageSizeChange.emit(pageSize);
  }
  _sortField: string;
  @Output() sortFieldChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() get sortField(): string { return this._sortField; }
  set sortField(sortField: string) {
    this._sortField = sortField;
    this.sortFieldChange.emit(sortField);
  }
  _sortDirection: SortDirection = SortDirection.Asc;
  @Output() sortDirectionChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() get sortDirection(): number { return this._sortDirection; }
  set sortDirection(sortDirection: number) {
    this._sortDirection = sortDirection;
    this.sortDirectionChange.emit(sortDirection);
  }
  _currentPage: number = 1;
  @Output() currentPageChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() get currentPage(): number { return this._currentPage; }
  set currentPage(currentPage: number) {
    this._currentPage = currentPage;
    this.currentPageChange.emit(currentPage);
  }
  //#endregion 
  _columns: TableColumn[] = [];
  searchDefinitions: any[]
  @Input() get columns(): TableColumn[] { return this._columns; }
  set columns(columns: TableColumn[]) {
    this._columns = columns;
    if (columns) {
      this.searchDefinitions = this.filterPipe.buildSearchDefinitions(this.columns);
    }
  }

  @Input() dataKey: string;
  @Input() totalRecords: number;
  @Input() isLoadLazy: boolean;
  @Input() paginator = true;
  @Input() isClickableRow: boolean;
  @Input() searchTerm: string;
  @Input() showCaption: boolean = true;

  //Row style
  //use for set calss for whole row conditional by field value
  @Input() fieldForRowClass: string;
  @Input() valueForRowClass: any;


  //filter
  @Input() isFilterable = true;
  @Input() globalFilterFields: any[]

  //selection
  @Input() selectionMode = SelectionMode.Multiple;
  @Input() hideSelectorsColumn = true; // if it's false, selectionMode must be none
  @Input() hideHeaderCheckBox = false;

  //row expand
  @Input() rowExpand: boolean = false;
  @Input() rowExpandTemplate: TemplateRef<any>;
  @Input() rowExpandMode = ExpandMode.Multiple;

  //scrolling
  @Input() scrollable: boolean;
  @Input() scrollHeight: string;


  @Output() onChangeFilter = new EventEmitter();
  @Output() onLoadData = new EventEmitter();
  @Output() onRowClick = new EventEmitter();
  @Output() onRowExpand: EventEmitter<any> = new EventEmitter();
  @Output() onRowCollapse: EventEmitter<any> = new EventEmitter();
  @Output() onRowSelecet: EventEmitter<any> = new EventEmitter();


  ngOnInit(): void {
    this.table
    this.loading = true;
    if (!this.isLoadLazy) {
      this.onLoadData.emit();
      this.loading = false;
    }

  }
  public loadGridLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.pageSize = event.rows > 0 ? event.rows : this.pageSize;
    this.currentPage = event.first / this.pageSize + 1;
    this.sortField = event.sortField;
    this.sortDirection = event.sortOrder;
    setTimeout(() => {
      const event = {
        pagination: {
          Limit: this.pageSize,
          PageIndex: this.currentPage,
        },
        sort: []
      };
      if (this.sortField) {
        const sortColumn = this.columns.find(c => c.field === this.sortField);
        if (!sortColumn) {
          console.error(`sorted field ${this.sortField} doesn't exist in columns list.`);
          return;
        }
        if (sortColumn.combinedFieldsNames?.length > 0) {
          event.sort = [];
          sortColumn.combinedFieldsNames.forEach(field => event.sort.push({
            field: `${field[0].toUpperCase()}${field.substring(1, field.length)}`,
            sortType: this.sortDirection
          }
          ))
        } else {
          event.sort = [
            {
              field: `${this.sortField[0].toUpperCase()}${this.sortField.substring(
                1,
                this.sortField.length
              )}`,
              sortType: this.sortDirection,
            },
          ];
        }
      }
      this.onLoadData.emit(event);
      this.loading = false;
    }, 1);
  }

  onRowExpandEvent(event) {
    this.onRowExpand.emit(event);
  }

  onRowCollapseEvent(event) {
    this.onRowCollapse.emit(event);
  }

  onRowSelecetEvent(event) {
    this.onRowSelecet.emit(event);
  }

  filter(dt, event, field, matchType) {
    dt.filter(event, field, matchType);
  }
  filterGlobal(freeSearchText) {
    this.table.filterGlobal(freeSearchText, 'contains');
  }
  filterField(value, field) {
    this.table.filter(value, field, 'equals')
  }
  public columnClass(colWidth?, headerClass?) {
    let ngClass = 'th-background';
    ngClass += colWidth && ` w-${colWidth}`;
    if (headerClass) {
      ngClass += ' ' + headerClass;
    }
    return ngClass;
  }
  toString(value: any) {
    return String(value)
  }
  onClickRow(row) {

  }
  buildCellClass(cellClassRules: any[], cellValue: any, rowData: any) {
    return cellClassRules.map(rule => rule.condition(cellValue, rowData) ? rule.class : '')
  }

  getDefaultField(obj, path, combinedFieldsNames) {
    let result = '';
    if (combinedFieldsNames && combinedFieldsNames.length) {
      result = combinedFieldsNames.reduce((p, field) => {
        var fieldPath = path && path.length ? `${path}.${field}` : field;
        var fieldValue = this.getPropertyByPath(obj, fieldPath);
        return `${p} ${fieldValue}`;
      }, '');
    } else {
      result = this.getPropertyByPath(obj, path);
    }
    return result;
  }

  getPropertyByPath(obj, path) {
    const properties = path.split('.');
    let value = obj;

    for (const prop of properties) {
      if (value && typeof value === 'object' && prop in value) {
        value = value[prop];
      } else {
        return undefined;
      }
    }
    return value;
  }
}
