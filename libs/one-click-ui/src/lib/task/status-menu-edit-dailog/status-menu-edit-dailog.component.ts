import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonServiceService, labelColorList } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-status-menu-edit-dailog',
  templateUrl: './status-menu-edit-dailog.component.html',
  styleUrls: ['./status-menu-edit-dailog.component.scss'],
})
export class StatusMenuEditDailogComponent {

  labelForm: FormGroup;
  colors = labelColorList;

  constructor(
    public dialogRef: MatDialogRef<StatusMenuEditDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    public commonServiceService: CommonServiceService
  ) { }

  ngOnInit(): void {


    this.labelForm = this.formBuilder.group({
      labels: this.formBuilder.array([])
    });

    this.commonServiceService.companyData.labels.forEach(el => {
      this.addLabel(el);
    })

  }

  get labels(): FormArray {
    return this.labelForm.get('labels') as FormArray;
  }

  createLabel(label: any = {}): FormGroup {
    return this.formBuilder.group({
      id: [label.id || ""],
      company_id: [label.company_id || this.commonServiceService.getCompnayId(), Validators.required],
      background: [label.background || this.colors[0], Validators.required],
      labelName: [label.labelName || '', Validators.required],
      createdBy: [label.createdBy || ''],
      createdAt: [label.createdAt || ''],
      updatedBy: [label.updatedBy || ''],
      updatedAt: [label.updatedAt || ''],
      deleteFlag: [label.deleteFlag || 'N']
    });
  }

  addLabel(label: any = {}): void {
    this.labels.push(this.createLabel(label));
  }

  // Remove a label from the FormArray
  removeLabel(index: number): void {
    this.labels.removeAt(index);
  }

  onSubmit(): void {
    if (this.labelForm.valid) {
      this.commonServiceService.createLabel(this.labelForm.value)
      this.dialogRef.close()
    } else {
      console.log('Form is invalid');
      this.labelForm.markAllAsTouched()
    }
  }

  selectColor(label: any, color: any) {
    label.get('background').setValue(color)
  }

  deleteItem(label: any, index: number) {

    if (label.get('id').value) {
      label.get('deleteFlag').setValue("Y");
    } else {
      this.removeLabel(index);
    }

  }


}
