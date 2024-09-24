import {AfterViewInit, Component, computed, effect, input, OnChanges, OnInit, output, viewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NgIf, UpperCasePipe} from '@angular/common';
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    UpperCasePipe,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButton,
    MatIconButton,
    NgIf
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent<T> {
  public actions = output<any>()
  public data = input.required<T[]>();
  public displayedColumns = input.required<string[]>();
  public dataSource = new MatTableDataSource<T>();

  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
      this.dataSource.sort = this._sort();
      this.dataSource.paginator = this._paginator();
    }, {allowSignalWrites: true});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(action: string, element: any) {
    console.log(element);
  }

  editUser(action: string, element: any) {
    console.log(element);
  }

  gridActions(action: string, element: any) {
    this.actions.emit({action, element});
  }

}
