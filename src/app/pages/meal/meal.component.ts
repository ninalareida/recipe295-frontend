import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Meal } from 'src/app/dataaccess/meal';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent } from '../../components/base/base.component';
import { MealService } from 'src/app/service/meal.service';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'src/app/service/header.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, AfterViewInit{
  mealDataSource = new MatTableDataSource<Meal>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['name', 'actions'];

  public constructor(private mealService: MealService, private dialog: MatDialog,
                      private headerService: HeaderService, private router: Router, private snackBar: MatSnackBar) {
    this.headerService.setPage('nav.departments');
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.mealDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.mealService.getList().subscribe(obj => {
      this.mealDataSource.data = obj;
    });
  }

  async edit(e: Meal) {
    await this.router.navigate(['meal', e.id]);
  }

  async add() {
    await this.router.navigate(['meal']);
  }
/**
  delete(e: Meal) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'dialogs.title_delete',
        message: 'dialogs.message_delete'
      }
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult === true) {
      this.mealService.delete(e.id).subscribe({
        next: response => {
          if (response.status === 200) {
            this.snackBar.open(this.deletedMessage, this.closeMessage, {duration: 5000});
            this.reloadData();
          } else {
            this.snackBar.open(this.deleteErrorMessage, this.closeMessage, {duration: 5000});
          }
        },
        error: () => this.snackBar.open(this.deleteErrorMessage, this.closeMessage, {duration: 5000})
      });
    }
  });
  }
  */
}
