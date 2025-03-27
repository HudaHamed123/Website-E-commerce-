import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  myToken:any
   constructor(private httpClient:HttpClient , @Inject(PLATFORM_ID) Id:object) {
     if (isPlatformBrowser(Id)) {
     this.myToken  = localStorage.getItem('userToken') 
     }
    }
addProductWishList(id:string):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist` ,
    {
      "productId": id
  },
  {
    headers:{
  token:this.myToken
    }
  }
  )
}
getLoggedUserWishList():Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist` ,
 
  {
    headers:{
  token:this.myToken
    }
  }
  )
}

removeProductWishList(id:string):Observable<any>{
  return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}` ,

    // https://ecommerce.routemisr.com/api/v1/wishlist/61e81f641904360ec15c6db1
 
  {
    headers:{
  token:this.myToken
    }
  }
  )
}
}
