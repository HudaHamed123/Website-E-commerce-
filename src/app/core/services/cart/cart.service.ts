import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { count } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  myToken:any
  cartNumber:BehaviorSubject<any> =new BehaviorSubject<any>(0);
  constructor(private httpClient:HttpClient , @Inject(PLATFORM_ID) Id:object) {
    if (isPlatformBrowser(Id)) {
    this.myToken  = localStorage.getItem('userToken') 
    }
    this.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartNumber.next(res.numOfCartItems)

        
      }
    })
   }


  addProductToCart(id:string):Observable<any>{
return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` ,
  {
    "productId": id
},
// {
//   headers:{
// token:this.myToken
//   }
// }
)
  }
  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      // {
      //   headers:{
      //     token:this.myToken
      //   }
      // }
    )
  }
//   getLoggedusercart():Observable<any>{
//     return this.httpClient.get(this.apipath+/cart,
//       {
//         headers:{
//           token:this.mytoken
//         }
//   }
// )
// };
  UpdateCartProduct(id:string , count:number):Observable<any>{
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {count:count},
      
      // {
      //   headers:{
      //     token:this.myToken
      //   }
      // }
    )
  }
  removeSpecificCart(id:string):Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,
    //   {
    //     headers:{
    //     token:this.myToken
    //   }
    // }
    )
  }
  clearCart():Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,
    //   {
    //     headers:{
    //     token:this.myToken
    //   }
    // }
    )
  }
}
