import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  id: string = 'new';

  product?: IProduct;

  productForm?: FormGroup;

  constructor(
    private productService: ProductService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') ?? 'new';
  }

  ngOnInit(): void {
    this.loadRecord();
  }

  loadRecord() {
    if (this.id !== 'new') {
      this.productService.show(this.id).subscribe({
        next: (dto) => {
          this.product = dto.data;

          console.log(this.product);

          this.createForm(this.product);
        },
      });
    } else {
      this.createForm();
    }
  }

  createForm(product?: IProduct) {
    this.productForm = this.formBuilder.group({
      name: [product?.name],
      description: [product?.description],
      price: [product?.price],
      images_meta: [''],
      // addImages: [],
    });
  }

  onSubmit() {
    const payload = { ...this.productForm?.value };

    console.log(payload);

    // const formData = new FormData()


    // // formData.append('name','hi')
    // formData.append('photos',payload.addImages);
    // // formData.append('description',payload.description)
    // // formData.append('price',payload.price)

    if (this.id !== 'new') {
      this.productService.update(this.id, payload).subscribe({
        next: (dto) => {
          this.createForm(dto.data);
          this.router.navigateByUrl('/products')

        },
      });
    } else {
      this.productService.store(payload).subscribe({
        next: (dto) => {
          // this.createForm(dto.data);
          this.router.navigateByUrl('/products')

        },
      });
    }
  }
  onFileSelected(event: any) {
    const selectedFiles: FileList = event.target.files;
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        const file: File = selectedFiles[i];
        formData.append('images[]', file, file.name);
      }
  
      // Send the form data to the backend API
      this.productService.uploadToS3(formData).subscribe({
        next: (response) => {
          console.log(response);
          //Todo further code will be done here
        },
      });      
    }
  }
  
}
