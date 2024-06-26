import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormField, MatInputModule} from '@angular/material/input'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { AddbookComponent } from './addbook/addbook.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditbookComponent } from './editbook/editbook.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule, matDatepickerAnimations} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    AddbookComponent,
    EditbookComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatPaginatorModule,
    MatCardModule,
    HttpClientModule,
    BrowserModule,
    MatFormFieldModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatDialogModule,
  
  
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
