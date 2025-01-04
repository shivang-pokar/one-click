import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDialogComponent, ConfirmationDialogComponent, FileManagerComponent, InviteDailogComponent, StatusMenuEditDailogComponent, TaskEditDialogComponent } from '@one-click/one-click-ui';
import { CreateProjectComponent } from 'libs/one-click-ui/src/lib/task/create-project/create-project.component';
import { Project, Task } from '@one-click/data';
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
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }

  error(msg: string) {
    message = msg;
    this.snackBar.openFromComponent(AlertErrorComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }

  confirmationDialog(message: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: message },
    });
    return dialogRef
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '350px',
      data: { title: title, message: message },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  fileDialog() {
    const dialogRef = this.dialog.open(FileManagerComponent, {
      width: '750px',
    });
    return dialogRef

  }

  openCreateProject(project?: Project) {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '500px',
      data: { project: project },
    });
    return dialogRef
  }

  openEditStatus(type: string = 'status') {
    const dialogRef = this.dialog.open(StatusMenuEditDailogComponent, {
      width: '500px',
      height: "435px",
      data: {
        type: type
      }
    });
    return dialogRef;
  }

  openTaskEdit(task: Task) {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      width: '40vw',
      height: '100vh',
      position: { right: '0' },
      panelClass: 'right-half-screen',
      data: {
        task: task
      }
    });
    return dialogRef;
  }

  openInviteDailog() {
    const dialogRef = this.dialog.open(InviteDailogComponent, {
      width: '500px',
      data: {},
    });
    return dialogRef
  }

}

/* Success */
@Component({
  selector: 'alert-success',
  template: `
  <div class="d-flex align-items-center">
  <span class="material-icons-outlined d-block success">check_circle</span> {{msg}}
  </div>
  `,
  styles: [
    `
    .success {
      margin-right:10px;
      //color: #00bfa5;
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
  <span class="material-icons-outlined error">
cancel
</span> {{msg}}
  </div>
  `,
  styles: [
    `
    .error {
      margin-right:10px;
      //color: #e04055;
      font-size:26px;
    }
  `,
  ],
})
export class AlertErrorComponent {
  msg = message;
}