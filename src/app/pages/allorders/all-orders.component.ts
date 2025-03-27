import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order/order.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Allorders } from '../../shared/interfaces/allorders';

@Component({
  selector: 'app-all-orders',
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  private readonly orderService=inject(OrderService)
  private readonly authService=inject(AuthService)
  userId:string|null=''
  allOrdersList:Allorders[]=[]
 ngOnInit(): void {
  this.authService.getUserData();
  this.userId= this.authService.userData.id
    this.orderService.getUserOrder(this.userId).subscribe({
      next:(res)=>{
        console.log(res);
        this.allOrdersList=res
        
      }
    }) 
 }
}
