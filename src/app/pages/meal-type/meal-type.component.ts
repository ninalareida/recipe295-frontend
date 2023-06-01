import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MealType } from 'src/app/dataaccess/meal-type';
import { MealtypeService } from 'src/app/service/mealtype.service';

@Component({
  selector: 'app-meal-type',
  templateUrl: './meal-type.component.html',
  styleUrls: ['./meal-type.component.scss']
})
export class MealTypeComponent implements OnInit, AfterViewInit {


  mealtypeDataSource = new MatTableDataSource<MealType>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'type', 'actions'];

  public constructor(private mealtypeService: MealtypeService, private dialog: MatDialog,
    private router: Router, private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.mealtypeDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.mealtypeService.getList().subscribe(obj => {
      this.mealtypeDataSource.data = obj;
    });
  }

  async edit(e: MealType) {
    await this.router.navigate(['meal-type', e.id]);
  }

  async add() {
    await this.router.navigate(['meal-type']);
  }

  delete(e: MealType) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete meal type?',
        message: 'Do you really want to delete the selected meal type?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.mealtypeService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Meal type deleted!"', 'Close', {duration: 5000});
              this.reloadData();
            } else {
              this.snackBar.open('Item could not be deleted, server error!', 'Close', {duration: 5000});
            }
          },
          error: () => this.snackBar.open('Item could not be deleted, server error!', 'Close', {duration: 5000})
        });
      }
    });
  }

}
