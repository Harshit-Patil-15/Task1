import { Component, OnInit } from "@angular/core";
import { AddbookComponent } from "../addbook/addbook.component";
import { BookService } from "../book.service";
import { EditbookComponent } from "../editbook/editbook.component";
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from "../auth.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
    selector:'app-landing',
    templateUrl:'./landing.component.html',
    styleUrls:['./landing.component.css']  
})


export class LandingComponent implements OnInit{



    books: any[] = [];
    search: string = '';
    limit: number = 5;
    totalBooks: number = 0;
    page: number = 1;
    userRole: any='';

    constructor(
        private bookService: BookService,
        private authService: AuthService,
        public dialog: MatDialog 
    ){}

    ngOnInit(): void {
      console.log("get user role  landing"+ this.userRole);
      this.userRole = this.authService.getUserRole();
    }


    onGetBooks() {
        console.log('get book landing comp');
        this.bookService.getBooks(this.search, this.page, this.limit).subscribe(
            (response) => {
               
                this.books = response.books; 
                this.totalBooks = response.total; 
                console.log('Books:', response);
                console.log("this is from ongetbook"+this.books[0].DOL);
              },
              (error) => {
                console.error('Error fetching books:', error);
              }  
        );
    }
    onPageChange(event: PageEvent) {
      this.page = event.pageIndex + 1;
      this.onGetBooks();
    }


      
     onSearchBooks() {
        console.log(this.search);
        this.onGetBooks()
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
            this.bookService.editBook(book._id,updatedBook).subscribe(
                () => {
                  console.log('editing  book:', updatedBook);
                },
                (error) => {
                  console.error('Error editing book', error);
                }
              );
          });

    }

    onAddBooks() {
      console.log("add book clicked ")
      const dialogRef = this.dialog.open(AddbookComponent, {
        width: '400px',
      });
  
      dialogRef.afterClosed().subscribe((newBook: any) => {
        if (newBook) {
          console.log('Updated Book:', newBook);
          this.books=newBook;
        }
        this.bookService.addBook(newBook).subscribe(
          (response) => {
            console.log('Book added successfully:', response);

          },
          (error) => {
            console.error('Error adding book:', error);
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
      


      Logout() {
       this.authService.logout();
        }

}

