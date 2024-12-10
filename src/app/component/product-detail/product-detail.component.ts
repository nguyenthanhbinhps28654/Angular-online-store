import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  id!: string;
  category!: Category;

  constructor(private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService, private router: Router) {
    this.id = route.snapshot.params['id'];
   }

  ngOnInit() {
    //Lấy sản phẩm theo id
    this.productService.get(this.id).subscribe(data =>{
      this.product = data as Product;
      console.log(this.product);
      // //Lấy danh mục theo product.category
      // this.categoryService.get(this.product.category).subscribe(cate =>{
      //   this.category = cate as Category;
      // });
    });
  }

}
