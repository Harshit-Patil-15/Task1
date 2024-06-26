import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
   
})
export class LoginComponent{
   
  email: string='';
  password: string='';
    
    constructor(
        private authService: AuthService,
        private router: Router
    ){};
    
onSubmitLogin(form :NgForm) {
  if(form.invalid){
    return;
  }
  console.log(form.value);
  this.authService.login(form.value.email,form.value.password)
  .subscribe(
    ()=> {  console.log(form.value);this.router.navigate(['/landing'])},
    error=>console.error('Error logging in', error)
  );
  form.resetForm();
}      
    
}