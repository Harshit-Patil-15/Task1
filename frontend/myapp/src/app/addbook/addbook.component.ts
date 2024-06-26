import { Component } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.css'
})
export class AddbookComponent {
  name: string='';
  author: string='';
  DOL: any=null;
  price: number=0;

  constructor(private bookService: BookService) { }
  addBook(){
    this.bookService.addBook({
      name: this.name,
      author: this.author,
      DOL: this.DOL,
      price: this.price
    }).subscribe(
      (response) => {
        console.log('Book added successfully:', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );

  }
  resetForm() {
    this.name = '',
      this.author = '',
      this.DOL = null,
      this.price = 0
  }





}
