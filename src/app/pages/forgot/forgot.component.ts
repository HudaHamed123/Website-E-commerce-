import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  step:number=1
  isLoading:boolean=false;

  verifyEmail:FormGroup =new FormGroup({
    email : new FormControl (null, [Validators.required, Validators.email] )
  })
  verifyCode:FormGroup=new FormGroup({
    resetCode : new FormControl (null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)] )
  })
  resetPassword:FormGroup=new FormGroup({
    email : new FormControl (null, [Validators.required, Validators.email] ),
    newPassword:new FormControl(null , [ Validators.pattern(/^\w{7,}$/)])
  })

  verifyEmailSumbit():void{
    let emailValue = this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)
    this.isLoading=true
    this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
if (res.statusMsg === 'success') {
  this.step=2
}
this.isLoading=false
      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false
      }
    })
  }



  verifyCodeSumbit():void{
    this.isLoading=true
    this.authService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
if (res.status === 'Success') {
  this.step=3
}
this.isLoading=false
      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false 
      }
    })
  }

  resetPasswordSumbit():void{
    this.isLoading=true
    this.authService.setResetPass(this.resetPassword.value).subscribe({
      next:(res)=>{
      localStorage.setItem('userToken', res.token);
      this.authService.getUserData()
      this.router.navigate(['/home'])
      this.isLoading=false
      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false
      }
    })
  }
}
