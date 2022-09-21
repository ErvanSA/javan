import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private readonly unSubs = new Subject<any>();

  dataUsers: any;
  isLoading: boolean = true;

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService
      .getDataApi('users')
      .pipe(takeUntil(this.unSubs))
      .subscribe(
        (res: any) => {
          this.dataUsers = res;
          this.isLoading = false;
          this.dialogLoading(false);
        },
        (err) => {
          this.isLoading = false;
          this.dialogLoading(false);
        }
      );
  }

  onDialog(data?: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(DialogUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      // tambah data
      if (result?.event == 'add') {
        this.dialogLoading(true);
        this.apiService.postDataApi('users', result.data).subscribe(
          (res) => {
            this.getData();
          },
          (err) => {
            this.dialogLoading(false);
          }
        );
      }
      // edit data
      if (result?.event == 'edit') {
        this.dialogLoading(true);
        this.apiService.putDataApi(`users/${data?.id}`, result.data).subscribe(
          (res) => {
            this.getData();
          },
          (err) => {
            this.dialogLoading(false);
          }
        );
      }
    });
  }

  public dialogLoading(isOpen: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    if (isOpen == true) {
      this.dialog.open(LoaderComponent, dialogConfig);
    } else {
      this.dialog.closeAll();
    }
  }

  onDelete(id: any) {
    this.dialogLoading(true);
    this.apiService.deleteDataApi(`users/${id}`).subscribe(
      (res) => {
        this.getData();
      },
      (err) => {
        this.dialogLoading(false);
      }
    );
  }

  ngOnDestroy(): void {
    this.unSubs.complete();
    this.unSubs.unsubscribe();
  }
}
