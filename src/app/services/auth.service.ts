import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000';


constructor(private httpClient: HttpClient) { }

  //hàm đăng ký
  register(body: any): any{
    return this.httpClient.post<any>(`${this.url}/account/add`, body)
  }

  //hàm đăng nhập
  login(body: any): any{
    return this.httpClient.post<any>(`${this.url}/account/login`, body)
  }

  getToken(){
    let jsonData = localStorage.getItem('login')
    if (jsonData) {
      return JSON.parse(jsonData).access_token;
      
    }
    return false;
  }

  getAll(){
    //gọi API với Bearer token
    const headers = {'Authorization': 'Bearer ' + this.getToken()};
    return this.httpClient.get(`${this.url}/api/categories`, {headers});
  }

  getRefreshToken(){
    let jsonData = localStorage.getItem('login')
    if (jsonData) {
      return JSON.parse(jsonData).refresh_token;
      
    }
    return false;
  }

  //hàmg đăng nhập
  refreshToken(refreshToken: any): any{
    return this.httpClient.post<any>(`${this.url}/api/refresh-token`, refreshToken)
  }
}
