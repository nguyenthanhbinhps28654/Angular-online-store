import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  user: User;

  constructor(private authService: AuthService) {
    this.user = new User();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    
  }

  
  onLogin(): void {
    if (this.loginForm.invalid) {
      alert('Vui lòng nhập hợp lệ');
      return console.log('Không hợp lệ');
    }
  
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        alert('Đăng nhập thành công');
        let jsonData = JSON.stringify(res);
        localStorage.setItem('login', jsonData);
        location.assign('/');
      },
      (error: any) => {
        console.error(error);
        console.log('Sai tên đăng nhập hoặc mật khẩu');
        alert('Sai tên đăng nhập hoặc mật khẩu');
      }
    );
  }
  

  ngOnInit() {

  }


}
