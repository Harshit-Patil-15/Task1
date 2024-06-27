import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrl: './editbook.component.css'
})
export class EditbookComponent {
book: any;
constructor(
  public dialogRef: MatDialogRef<EditbookComponent>,
 @Inject(MAT_DIALOG_DATA) public data:any
) {
 this.book = { ...data.book };
 if(this.book.DOL){
  this.book.DOL=this.book.DOL.split('T')[0];
 }
}
sendData() {
  this.dialogRef.close(this.book);
}

}
