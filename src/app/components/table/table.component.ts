import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { Todo } from '../../../interfaces/todo.interface';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule,NgClass],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name'];
  dataSource = new MatTableDataSource<Todo>();
  selection = new SelectionModel<Todo>(true, []);
  status: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getData().subscribe(
      (data: any) => {
        this.dataSource.data = data;
        this.status = data.completed;
        console.log(this.status);

        console.log('Fetched data:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Todo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }

  areAllCompleted(): boolean {
    // Check if all items in dataSource are completed

    return this.dataSource.data.every((todo) => todo.completed);
  }
}
