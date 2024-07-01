import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })


  export class BookService {
    private bookUrl = 'http://localhost:5000/api/books';
  
    constructor(private http: HttpClient) { }
  
    
    getBooks(search: string = '', page: number = 1, limit: number = 5): Observable <any> {
      const token = localStorage.getItem('token'); 
      let headers = new HttpHeaders ();
  
      if (token) {
        headers = headers.set('Authorization', `${token}`);
      }
      return this.http.get<any>(`${this.bookUrl}/getBooks?search=${search}&page=${page}&limit=${limit}` ,{ headers });
    }
  
    addBook(book: any): Observable<any> {
      const token = localStorage.getItem('token'); 
      let headers = new HttpHeaders ();
  
      if (token) {
        headers = headers.set('Authorization', `${token}`);
      }
      return this.http.post<any>(`${this.bookUrl}/addBook`, book,{ headers });
    }
  
    editBook(id: string, book: any): Observable<any> {
      const token = localStorage.getItem('token'); 
      let headers = new HttpHeaders ();
  
      if (token) {
        headers = headers.set('Authorization', `${token}`);
      }
      console.log("editbook Service" + book.price);
      return this.http.put<any>(`${this.bookUrl}/editBook/${id}`,book,{ headers });
    }
  
    deleteBook(id: string): Observable<any> {
      const token = localStorage.getItem('token'); 
      let headers = new HttpHeaders ();
  
      if (token) {
        headers = headers.set('Authorization', `${token}`);
      }
      return this.http.delete<any>(`${this.bookUrl}/deleteBook/${id}`,{ headers });
    }
  }