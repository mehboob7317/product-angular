import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router
  ){

  }

  products: IProduct[] = []

  ngOnInit(): void {
     this.loadRecords()
  }

  loadRecords() {
    this.productService.index().subscribe({
      next: (dto) => {
        console.log(dto)

        this.products = dto.data
      }
    })
  }

  onCreate() {
    this.router.navigateByUrl(`/products/new`);

  }

  onEdit(id: string) {
    this.router.navigateByUrl(`/products/${id}`);
  }

  onDelete(id: string){
    this.productService.destory(id).subscribe({
      next: (dto) => {
        this.loadRecords()
      }
    })

  }
  
}
