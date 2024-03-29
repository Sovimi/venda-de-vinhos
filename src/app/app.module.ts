import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WineComponent } from './wine/wine.component';
import { WineDetailComponent } from './wine-detail/wine-detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const appRoutes: Routes = [
  { path: '', 
    component: HomeComponent 
  },
  {
    path: 'wines',
    component: WineComponent,
    data: { title: 'Wine List' }
  },
  {
    path: 'wine-details/:id',
    component: WineDetailComponent,
    data: { title: 'Wine Details' }
  },
  { path: 'login', 
    component: LoginComponent, 
    data: { title: 'Login' }
  },
  { path: 'register', 
    component: RegisterComponent 
  },
  { path: 'profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuardService] 
  },
  { path: 'cart/:id', 
    component: CartComponent, 
    canActivate: [AuthGuardService]
  },
  { path: 'orders/:id', 
    component: OrderComponent, 
    canActivate: [AuthGuardService]
  },
  {
    path: 'order-details/:id',
    component: OrderDetailComponent,
    data: { title: 'Order Details' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WineComponent,
    WineDetailComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    CartComponent,
    OrderComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
