import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product!: Product[]; // Khai báo biến sản phẩm

  constructor(private productService: ProductService, private router: Router) { } // Chú ý chữ cái đầu tiên ở tên biến

  ngOnInit() {
    this.loadProducts(); // Gọi hàm loadProducts khi component khởi tạo
  }

  loadProducts() {
    this.productService.getAll().subscribe(data => {
      this.product = data as Product[]; // Gán dữ liệu sản phẩm vào mảng
      console.log(this.product); // In ra để kiểm tra dữ liệu
    });
  }
}
