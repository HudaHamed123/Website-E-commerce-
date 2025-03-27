
import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, MaxValidator, ReactiveFormsModule, Validators}from'@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 isLoading:boolean=false;
  msgError:string='';
  success:string=''
 private readonly authService=inject(AuthService)
 private readonly router = inject(Router)
loginForm :FormGroup =new FormGroup({
 
  email:new FormControl(null, [Validators.required, Validators.email]),
  password:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
 

} )

submitForm():void{
if (this.loginForm.valid) {
  this.isLoading=true
  this.authService.sendLoginForm(this.loginForm.value).subscribe({
    next:(res)=>{

if (res.message === 'success') {
setTimeout(() => {
  localStorage.setItem("userToken", res.token);

this.authService.getUserData()

this.router.navigate(['/home']);


}, 500);
this.success = res.message 
}
this.isLoading=false

    },error:(err:HttpErrorResponse)=>{
console.log(err);
this.msgError=err.error.message

this.isLoading=false
    }

  })  
}


}

}


