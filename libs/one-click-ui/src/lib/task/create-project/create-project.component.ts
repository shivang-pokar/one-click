import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'one-click-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {

  projectForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
  ) {

    const company_id = this.cookieService.get('company_id')

    this.projectForm = this.formBuilder.group({
      id: [''],
      projectName: ['', Validators.required],
      projectDescription: [''],
      createdBy: [''],
      createdAt: [''],
      updatedBy: [''],
      updatedAt: [''],
      deleteFlag: ['N'],
      label: [''],
      lastOpened: [''],
      company_id: [company_id],
      completed: [false],
      trashed: [false],
      isTemplate: [false]
    });

  }

  ngOnInit(): void {
    if (this.data.project) {
      this.projectForm.patchValue(this.data.project);
    }
  }

  createProject() {
    if (this.projectForm.valid) {
      this.dialogRef.close(this.projectForm.value);
    } else {
      this.projectForm.markAsTouched();
    }
  }

}
