import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Chef } from 'src/app/dataaccess/chef';
import { ChefService } from 'src/app/service/chef.service';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.scss']
})
export class ChefComponent implements OnInit, AfterViewInit {

  chefDataSource = new MatTableDataSource<Chef>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'firstname', 'lastname', 'comment'];

  public constructor(private chefService: ChefService, private dialog: MatDialog,
    private router: Router, private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.chefDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.chefService.getList().subscribe(obj => {
      this.chefDataSource.data = obj;
    });
  }

  async edit(e: Chef) {
    await this.router.navigate(['chef', e.id]);
  }

  async add() {
    await this.router.navigate(['chef']);
  }

  delete(e: Chef) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete chef?',
        message: 'Do you really want to delete the selected chef?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.chefService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Chef deleted!"', 'Close', {duration: 5000});
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
