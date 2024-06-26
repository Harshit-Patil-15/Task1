import { Component } from "@angular/core";
import { AddbookComponent } from "../addbook/addbook.component";
import { BookService } from "../book.service";
import { EditbookComponent } from "../editbook/editbook.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector:'app-landing',
    templateUrl:'./landing.component.html',
    styleUrls:['./landing.component.css']  
})


export class LandingComponent {
books: any[] = [];

    search: string = 'Harry';
    limit: number = 5;
    totalBooks: number = 0;
    page: number = 1;
    constructor(
        private bookService: BookService,
        public dialog: MatDialog 
    ){}
    onGetBooks() {
        console.log('get book landing comp');
        this.bookService.getBooks(this.search, this.page, this.limit).subscribe(
            (response) => {
                this.books = response.books; 
                this.totalBooks = response.total; 
                console.log('Books:', response);
              },
              (error) => {
                console.error('Error fetching books:', error);
              }  
        );
    }


    editBook(book:any) {
        const dialogRef = this.dialog.open(EditbookComponent, {
            width: '400px',
            data: { book: {...book} } 
          });
      
          dialogRef.afterClosed().subscribe((updatedBook: any) => {
            if (updatedBook) {
              console.log('Updated Book:', updatedBook);
            }
            this.bookService.editBook(book._id,book).subscribe(
                () => {
                  console.log('editing  book:', book);
                },
                (error) => {
                  console.error('Error editing book', error);
                }
              );
          });

    }
   
    
   
    deleteBook(book:any) {
        console.log('Deleting book:', book);
        this.bookService.deleteBook(book._id).subscribe(
            () => {
             
              this.books = this.books.filter(b => b.id !== book.id);
              console.log('Deleting book:', book);
            },
            (error) => {
              console.error('Error deleting book', error);
            }
          );
        }
        

}