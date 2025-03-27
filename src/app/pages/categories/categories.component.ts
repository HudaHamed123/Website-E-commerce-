import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent  implements OnInit{
   private readonly categoriesService =inject(CategoriesService)
   categories:Icategories[]=[];
   ngOnInit(): void {
  
    this.getCategoriesData()
   }
  getCategoriesData(){
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categories=res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  
  }
}
