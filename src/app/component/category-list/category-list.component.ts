import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';  // Đảm bảo đường dẫn đúng


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories!: Category[];

  constructor(private categoryService: CategoryService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    return this.categoryService.getAll().subscribe(data => {
        this.categories = data as Category[];
    }, (error: any) => {
        if (error && error.status === 401) {
            try {
                const refreshToken = this.auth.getRefreshToken();
                console.log(refreshToken);
                if (!refreshToken) {
                    // nếu refresh token không có thì redirect về trang login
                    this.router.navigate(['/login']);
                    return;
                }
                // Gọi API refresh token để lấy new access token
                this.auth.refreshToken({'refresh_token': refreshToken}).subscribe((res: any) => {
                    console.log(res);

                    // cập nhật access token và refresh token
                    let jsonData = JSON.stringify(res);
                    localStorage.setItem('login', jsonData);
                    
                    // gọi và lấy API lấy danh sách và danh mục
                    this.categoryService.getAll().subscribe(data => {
                        this.categories = data as Category[];
                    });
                });
            } catch (refreshError) {
                console.error('Error refreshing token: ', refreshError);
                // Nếu refresh token lỗi thì redirect về trang login
                this.router.navigate(['/login']);
            }
        } else {
            // Phần này là khối mã của else
            console.error('Error fetching data: ', error);
            throw error;
        }
    });
}


  deleteCategory(id: string){
    var result = confirm("Want to delete?");
    if(result){
      this.categoryService.delete(id).subscribe(data => {
        this.router.navigate(['/admin/category-list'])
        .then(()=>{
          window.location.reload()
        })
      })
    }
  }
}
