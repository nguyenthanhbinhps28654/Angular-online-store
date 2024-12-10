import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryAddComponent } from './component/category-add/category-add.component';
import { CategoryEditComponent } from './component/category-edit/category-edit.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductAddComponent } from './component/product-add/product-add.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProductDetailComponent } from "./component/product-detail/product-detail.component";
import { ProductsComponent } from './component/products/products.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'product-detail/:id', component: ProductDetailComponent},
  { path: 'admin', component: DashboardComponent,
    children: [
      { path: 'category-list', component: CategoryListComponent},
      { path: 'category-add', component: CategoryAddComponent},
      { path: 'category-edit/:id', component: CategoryEditComponent},
      { path: 'product-list', component: ProductListComponent},
      { path: 'product-add', component: ProductAddComponent},
      { path: 'product-edit/:id', component: ProductEditComponent},
    ]
  },
  
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  declarations: [			
    AppComponent,
      HeaderComponent,
      FooterComponent,
      HomeComponent,
      LoginComponent,
      CategoryListComponent,
      CategoryAddComponent,
      CategoryEditComponent,
      ProductListComponent,
      ProductAddComponent,
      ProductEditComponent,
      DashboardComponent,
      ProductDetailComponent,
      ProductsComponent,
      RegisterComponent
      

   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
