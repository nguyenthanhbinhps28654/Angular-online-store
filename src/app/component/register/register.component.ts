import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  constructor(private authService: AuthService) {
    this.user = new User();
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // fullname: new FormControl('', [Validators.required, this.fullNameValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', [Validators.required]),
    });

    this.registerForm.setValidators(this.passwordMatchValidator());
  }

  // fullNameValidator(control: AbstractControl): ValidationErrors | null {
  //   const forbiddenWords = ['ma túy', 'hàng trắng'];
  //   if (forbiddenWords.some(word => control.value.toLowerCase().includes(word))) {
  //     return { forbiddenWords: true };
  //   }
  //   return null;
  // }
  
  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('rePassword')?.value;

      if (password && confirmPassword && password !== confirmPassword) {
        return { mismatch: true };
      }
      return null;
    };
  }
  
  onRegister(): void {
    console.log(this.registerForm.value);
  
    if (this.registerForm.invalid) {
      console.log(this.registerForm);
      alert('Vui lòng nhập hợp lệ');
      return console.log('Không hợp lệ');
    }
  
    this.authService.register(this.registerForm.value).subscribe(
      (res: any) => {
        console.log(res);
        alert('Đăng kí thành công');
        // Bạn có thể chuyển hướng đến trang đăng nhập hoặc trang chính
        location.assign('/login');
      },
      (error: any) => {
        console.error(error);
        alert('Có lỗi xảy ra trong quá trình đăng ký');
      }
    );
  }

  ngOnInit(): void {
    // Có thể thực hiện các hành động khởi tạo khác nếu cần
  }
}
