import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:3000';
constructor(private httpClient: HttpClient) { }

getAll(){
  return this.httpClient.get(`${this.url}/category`);
}

get(id: string){
  return this.httpClient.get(`${this.url}/category/${id}`);
}

delete(id: string){
  return this.httpClient.delete(`${this.url}/category/${id}`);
}

save(category: Category){
  return this.httpClient.post(`${this.url}/category`, category);
}

update(id: string, category: Category){
  return this.httpClient.put(`${this.url}/category/${id}`, category);
}

}
