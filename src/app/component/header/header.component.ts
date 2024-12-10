import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories!: Category[];
  keyword!: string;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.categoryService.getAll().subscribe(data=>{
      this.categories = data as Category[]; //trong họpe dữ liệu k khớp
    });
   }

  ngOnInit() {
  }

  onSearch(){
    if (this.keyword) {
      this.router.navigate(
        ['/products'],
        { queryParams: {keyword: this.keyword}}
      );
    }
  }
  onLogout(): void {
    const login = localStorage.getItem('login');
    if (login) {
        alert('Đăng xuất thành công');
        localStorage.removeItem('login');
        this.router.navigate(['/login']);
    } else {
        alert('Bạn chưa đăng nhập, đăng xuất thất bại.');
    }
  }

}
