import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  categories!: Category[]

  constructor( private productService: ProductService, private router: Router, private categoryService: CategoryService,) {
    this.product = new Product;
    this.productForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'category': new FormControl(null),
      'price': new FormControl(null, Validators.required),
      'mota': new FormControl(null, Validators.required),
      // 'image': new FormControl(null, Validators.required),
      'HinhAnh': new FormControl(null, Validators.required),
    });

   }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data=>{
      console.log(this.categories);
      this.categories = data as Category[];
      
    });
  }

  onSubmit () {
    if (this.productForm.invalid) {
      alert('Vui long nhap thong tin hop le');
      return console.log('khong hop le');
      
    }else{
      this.productService.save(this.product).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/admin/product-list']);
      });
    }
  }

}
