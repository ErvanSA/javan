import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss'],
})
export class DialogUserComponent implements OnInit {
  formData!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: [this.data ? this.data?.name : null, Validators.required],
      address: [this.data ? this.data?.address : null, Validators.required],
    });
  }

  onSubmit() {
    this.dialogRef.close({
      event: this.data ? 'edit' : 'add',
      data: this.formData.value,
    });
  }
}
