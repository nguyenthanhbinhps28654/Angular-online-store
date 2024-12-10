import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  product!: Product;
  categories!: Category[];
  id!: string;
  constructor(private productServices: ProductService, private router: Router, private route: ActivatedRoute, private categoryServices: CategoryService) { 
    this.id = route.snapshot.params['id'];
    console.log(`id is ${this.id}`);

    this.productForm = new FormGroup({
      '_id': new FormControl(null,[Validators.required]),
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'price': new FormControl('', [Validators.required]),
      'mota': new FormControl('', [Validators.required, Validators.minLength(5)]),
      // 'image': new FormControl(null, Validators.required),
      'HinhAnh': new FormControl(null, Validators.required),
      'category': new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {
    this.productServices.get(this.id).subscribe(data => {
      this.product = data as Product;
      console.log(this.product);
    });
  
    // Only fetching all categories
    this.categoryServices.getAll().subscribe(data => {
      this.categories = data as Category[];
    });
  }
  
  onSubmit() {
    if(this.productForm.invalid){
      alert('Vui lòng nhập thông tin hợp lệ');
      return console.log('Không hợp lệ');
    }
    else{
      this.productServices.update(this.id, this.product).subscribe(data => {
        console.log(data);
        this.router.navigate(['admin/product-list'])
        
      })
    }
  }

}