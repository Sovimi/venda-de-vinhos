import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WineComponent } from './wine/wine.component';
import { WineDetailComponent } from './wine-detail/wine-detail.component';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'wines',
    component: WineComponent,
    data: { title: 'Wine List' }
  },
  {
    path: 'wine-details/:id',
    component: WineDetailComponent,
    data: { title: 'Wine Details' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WineComponent,
    WineDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
