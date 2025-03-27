import { Component, inject, Inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { ProductElement } from '../../shared/interfaces/icart';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { SearchPipe } from '../../shared/pipe/search/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
  products:Iproduct []=[];
  wishList:string[]=[];
  
   private readonly wishListService=inject(WishListService)
   private readonly cartService=inject(CartService)
   private readonly toastr=inject(ToastrService)
  
ngOnInit(): void {
   this.wishListService.getLoggedUserWishList().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.products=res.data
    },error:(err)=>{
      console.log(err);
    }
    
   }) 
   
}

addToCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.toastr.success(res.message,'success' ,{
        closeButton:true,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-left'
      })
     
    },error:(err)=>{
      console.log(err); 
    }
  })
  }

  addToWishlist(id:string):void{
    this.wishListService.addProductWishList(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.wishList=res.data
        this.toastr.success(res.message,'success' ,{
          closeButton:true,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-left'
        })
        
      },error:(err)=>{
    console.log(err);
    
      }
    })
    }
    removeFromWishlist(id:string):void{
      this.wishListService.removeProductWishList(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.wishList=res.data
          const newProductData = this .products.filter((item:any)=>this.wishList.includes(item._id))
          this.products = newProductData
          this.toastr.success(res.message,'success' ,{
            closeButton:true,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-left'
          })

          
        },error:(err)=>{
      console.log(err);
      
        }
      })
      }





// private readonly cartService=inject(CartService)
// totalPrice:number=0
// cartDetails:ProductElement[]= []
// cartId:any
  
//   getCartData():void{
//     this.cartService.getLoggedUserCart().subscribe({
//       next:(res)=>{
 
//     })
//   }
//   updateCart(id:string , count:number):void{
//     this.cartService.UpdateCartProduct(id , count).subscribe({
//       next:(res)=>{
//         this.totalPrice =res.data.totalCartPrice
//         this.cartDetails=res.data.products;
//       }
//     })

//   }
//   removeItem(id:string):void{
// this.cartService.removeSpecificCart(id).subscribe({
//   next:(res)=>{
//     this.totalPrice =res.data.totalCartPrice
//     this.cartDetails=res.data.products;
//   }
// })
//   }

}
