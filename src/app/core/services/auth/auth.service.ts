import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import{jwtDecode}from 'jwt-decode'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router =inject(Router)
  userData:any;
  constructor( private httpClient:HttpClient ) { }
  sendRegisterForm(data:object):Observable<any>{
  return  this.httpClient.post (`${environment.baseUrl}/api/v1/auth/signup`, data)
  }
  sendLoginForm(data:object):Observable<any>{
return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }



  getUserData():void{
  this.userData=jwtDecode(localStorage.getItem("userToken")!)
  console.log(this.userData);
  
  }
  
  logoutUser():void{
   localStorage.removeItem("userToken")
   this.userData = null;
   this.router.navigate(['/login'])
  }
  

  setEmailVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }
  setCodeVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }
  setResetPass(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }
}
