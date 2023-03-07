import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/* import { CommonDialogComponent, ConfirmationDialogComponent, FileDialogComponent } from '@one-click/one-click-ui'; */
let message: string;

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  success(msg: string) {
    message = msg;
    this.snackBar.openFromComponent(AlertComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  error(msg: string) {
    message = msg;
    this.snackBar.openFromComponent(AlertErrorComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  /* openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '350px',
      data: { title: title, message: message },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  confirmationDialog(message: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: message },
    });
    return dialogRef
  }

  fileDialog() {
    const dialogRef = this.dialog.open(FileDialogComponent, {
      width: '750px',
    });
    return dialogRef

  } */

}

/* Success */
@Component({
  selector: 'alert-success',
  template: `
  <div class="d-flex align-items-center">
  <span class="material-icons d-block success">check_circle</span> {{msg}}
  </div>
  `,
  styles: [
    `
    .success {
      margin-right:10px;
      color: #00bfa5;
      font-size:26px;
    }
  `,
  ],
})
export class AlertComponent {
  msg = message;
}


/* Error */
@Component({
  selector: 'alert-error',
  template: `
  <div class="d-flex align-items-center">
  <span class="material-icons error">
cancel
</span> {{msg}}
  </div>
  `,
  styles: [
    `
    .error {
      margin-right:10px;
      color: #e04055;
      font-size:26px;
    }
  `,
  ],
})
export class AlertErrorComponent {
  msg = message;
}