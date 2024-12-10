import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup;
  category: Category;
  constructor(private categoryService: CategoryService, private router: Router) {
    this.category = new Category;
    this.categoryForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
   }

  ngOnInit() {
  }

  onSubmit () {
    if (this.categoryForm.invalid) {
      alert('Vui long nhap thong tin hop le');
      return console.log('Khong hop le');
      
    } else {
      this.categoryService.save(this.category).subscribe(data=>{
        console.log(data);
        this.router.navigate(['admin/category-list']);
      });
    }
  }

}
