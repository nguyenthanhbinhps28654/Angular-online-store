import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3000'; // URL của API

  constructor(private httpClient: HttpClient) { }

  // Lấy tất cả sản phẩm
  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/product`); // Chỉ định kiểu trả về
  }

  getProductByQuery(params: any){
    console.log(params);
    let query = '';
    if (params.keyword) {
      //http://localhost:3000/fr1/product?keyword=Áo thun
      query = `/find?keyword=${params.keyword}`;
    }else if (params.category) {
      //http://localhost:3000/fr1/product?category=id
      query = `category=${params.category}`;

    }
    console.log(query);
    console.log(`${this.url}/product${query}`);
    return this.httpClient.get(`${this.url}/product${query}`);
  }

  // Lấy sản phẩm theo ID
  get(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/product/${id}`); // Chỉ định kiểu trả về
  }

  // Xóa sản phẩm theo ID
  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/product/${id}`); // Chỉ định kiểu trả về
  }

  // Lưu sản phẩm mới
  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.url}/product`, product); // Chỉ định kiểu trả về
  }

  // Cập nhật sản phẩm theo ID
  update(id: string, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.url}/product/${id}`, product); // Chỉ định kiểu trả về
  }
}
