import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NewsletterComponent } from './shared/newsletter/newsletter.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { FilterPipe } from './filter.pipe';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LoginModalComponent } from './shared/login-modal/login-modal.component';
import { ForgotPasswordComponent } from './shared/login-modal/forgot-password/forgot-password.component';
import { CreateAccountComponent } from './shared/create-account/create-account.component';
import { BasketComponent } from './shared/basket/basket.component';
import { DecimalPipe } from '@angular/common';
import { ProductDetailComponent } from './vitrine/product-detail/product-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchedProductsComponent } from './vitrine/searched-products/searched-products.component';
import { FilterProductsPipe } from './filter-products.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VitrineComponent,
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    FilterPipe,
    LoginModalComponent,
    ForgotPasswordComponent,
    CreateAccountComponent,
    BasketComponent,
    ProductDetailComponent,
    SearchedProductsComponent,
    FilterProductsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    HttpClientModule
  ],
  providers: [FormBuilder, DecimalPipe, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
