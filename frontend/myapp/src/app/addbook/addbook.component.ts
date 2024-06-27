import { Component ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.css'
})
export class AddbookComponent {
  book: any = {
    name: '',
    author: '',
    DOL: '',
    price: 0
  };


  constructor(
    public dialogRef: MatDialogRef<AddbookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  addBook(): void {
    this.dialogRef.close(this.book);
  }
}