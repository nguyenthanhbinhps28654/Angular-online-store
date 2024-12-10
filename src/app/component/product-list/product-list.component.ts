import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    return this.productService.getAll().subscribe(data => {
      this.products = data as Product[];
      console.log(this.products);
    }, error => {
      console.log(error.message);
      
    });
  }

  deteleProduct(id: string){
    var result = confirm("Want to detele?");

    if (result) {
      this.productService.delete(id).subscribe(data => {
        this.router.navigate(['admin/product-list'])
        .then(() =>{
          window.location.reload();
        });
      });
    }
  }

}
