import { Component } from "@angular/core";
import { FormControl, NgForm, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
    selector:'app-register',
    templateUrl:'./register.component.html',
    styleUrls:['./register.component.css'] 
})
export class RegisterComponent {
        name: string='';
        email: string='';
        password: string= '';
        role: string= '' ;
        constructor(
            private authService: AuthService,
            private router: Router
        ){};

    onSubmitRegister(form: NgForm) {
        console.log(form.value);
        if (form.valid) {
            this.authService.register(
              form.value.name,
              form.value.email,
              form.value.password,
            form.value.role
            ).subscribe(
                (response) =>{
                 alert(response.message);
                 this.router.navigate(['/login'])
                },
                error => console.error('Error registering', error)
              );
     }
      
}
}