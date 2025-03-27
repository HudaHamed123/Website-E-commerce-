import { Component, inject } from '@angular/core';
import{AbstractControl, FormBuilder, FormControl, FormGroup, MaxValidator, ReactiveFormsModule, Validators}from'@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading:boolean=false;
  msgError:string='';
  success:string=''
 private readonly authService=inject(AuthService)
 private readonly router = inject(Router)
 private readonly formBuilder=inject(FormBuilder);

 registerForm:FormGroup = this.formBuilder.group({
  name:[null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  email:[null , [Validators.required, Validators.email]],
  password:[null , [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]],
  rePassword:[null],
  phone:[null ,[ Validators.pattern(/^01[0125][0-9]{8}$/)]]
 } , {validators: this.confirmPassWord})

// registerForm :FormGroup =new FormGroup({
//   name:new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)] ),
//   email:new FormControl(null, [Validators.required, Validators.email]),
//   password:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
//   rePassword:new FormControl(null),
//   phone:new FormControl(null , Validators.pattern(/^01[0125][0-9]{8}$/))

// } , {validators: this.confirmPassWord})

submitForm():void{
if (this.registerForm.valid) {
  this.isLoading=true
  this.authService.sendRegisterForm(this.registerForm.value).subscribe({
    next:(res)=>{
console.log(res);
if (res.message === 'success') {
setTimeout(() => {
  this.router.navigate(['/home'])

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
}else{
  this.registerForm.markAllAsTouched();
}


}
confirmPassWord(group:AbstractControl){
  const passWord = group.get('password')?.value;
  const rePassWord = group.get('rePassword')?.value
  return passWord === rePassWord ? null : {mismatch:true}
// if (passWord === rePassWord) {
//   return null
// }else{
//   return {mismatch:true}
// }
}
}
