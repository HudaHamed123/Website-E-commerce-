import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IproductsService {

  constructor(private httpClient:HttpClient) { }
  getAllProduct():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`)
    
  }
  getSpecificProduct(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)

  }
}
