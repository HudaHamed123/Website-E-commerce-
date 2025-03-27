import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IproductsService } from '../../core/services/products/iproducts.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe,CarouselModule, NgFor , NgIf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(IproductsService);
  private readonly toastr = inject(ToastrService);
  private readonly cartService = inject(CartService);

  productId: any;
  productDetails: Iproduct = {} as Iproduct;

  // قائمة الأحجام المتاحة
  availableSizes: string[] = ['XS','S', 'M', 'L', 'XL','XXL'];
  selectedSize: string | null = null; // الحجم المختار
  isFashionProduct: boolean = false; // تحديد إن كان المنتج من فئة "fashion"

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-right text-2xl text-gray-700"></i>',
      '<i class="fas fa-chevron-left text-2xl text-gray-700"></i>',
    ],
    items: 1,
    nav: true
  };

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get("id");
        this.productsService.getSpecificProduct(this.productId).subscribe({
          next: (res) => {
            this.productDetails = res.data;

            // تحقق إذا كان المنتج ينتمي إلى فئة "fashion"
            this.isFashionProduct = this.productDetails.category.name.toLowerCase().includes("fashion");
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToCart(id: string): void {
    if (this.isFashionProduct && !this.selectedSize) {
      this.toastr.error('Please select a size before adding to cart', 'Error', {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-left'
      });
      return;
    }

    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Success', {
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-top-left'
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }

  getEmptyStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5 ? 1 : 0;
    return Array(5 - fullStars - hasHalf).fill(0);
  }
}