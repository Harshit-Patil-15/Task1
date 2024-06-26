import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private apiUrl='http://localhost:5000/api/users';
    constructor(private http: HttpClient
      ,private router:Router
    ){ }
    
    private userRole:any=''
    
    
    login(email: string,password:string): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
        .pipe( 
            map((response:any)=>{
                if(response.token){
                    localStorage.setItem('token', response.token);
                    this.userRole=response.role;
                    console.log("after login1" +response.role);
                    console.log("after login2" +response);
                    const headers = new HttpHeaders().set('Authorization', `${response.token}`);
                    return { ...response, headers };
                }
                return response;
            })
        )
     }


     register(name: string, email: string, password: string, role: string) {
        return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password, role });
      }
    
      logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
      getUserRole(): string | null {
        console.log("get user role "+ this.userRole);
        console.log( this.userRole);
        return this.userRole;
      }

}