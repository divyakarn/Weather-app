import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpInterceptors } from './http-interceptor.interceptor';
import { PastDetailsComponent } from 'src/components/past-details/past-details.component';
import { FormsModule } from '@angular/forms';
import { HttpInterceptors } from './http-interceptor.interceptor';
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PastDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpInterceptors,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
