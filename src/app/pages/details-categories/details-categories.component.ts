import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IproductsService } from '../../core/services/products/iproducts.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-details-categories',
  imports: [],
  templateUrl: './details-categories.component.html',
  styleUrl: './details-categories.component.scss'
})
export class DetailsCategoriesComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesService= inject(CategoriesService);
  
  categoreId:string|null='';
  categoriesDetails:  any = {}
ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
     this.categoreId = params.get('id')
     this.categoriesService.getSpecificCategories(this.categoreId).subscribe({
      next:(res)=>{
     this.categoriesDetails=res.data
      },error:(err)=>{
        console.log(err);
        
      }
    })
      },error:(err)=>{
        console.log(err);
        
      }
    })
   


}


}