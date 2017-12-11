import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { FooterComponent } from './footer/footer.component';
import {AppRouteModule} from "./app-route.module";
import { HeroViewComponent } from './hero-view/hero-view.component';
import { AuthenticateComponent } from './authentication/authenticate/authenticate.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { BankTransferComponent } from './payment-method/bank-transfer/bank-transfer.component';
import { CreditcardComponent } from './payment-method/creditcard/creditcard.component';
import { PaypalPaymentComponent } from './payment-method/paypal-payment/paypal-payment.component';
import { PaymentMethodComponent } from './payment-method/payment-method/payment-method.component';
import {ProductService} from "./service/product.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import { ListProductComponent } from './product/list-product/list-product.component';
import {CartService} from "./service/cart.service";

import { SubmitSlipComponent } from './submit-slip/submit-slip.component';
import {AuthenticationService} from "./service/authentication.service";
import { HistoryComponent } from './history/history.component';
import {StudentsDataServerService} from "./service/students-data-server.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ViewProductComponent,
    FooterComponent,
    HeroViewComponent,
    AuthenticateComponent,
    SignUpComponent,
    SignInComponent,
    CartComponent,
    ConfirmationPageComponent,
    BankTransferComponent,
    CreditcardComponent,
    PaypalPaymentComponent,
    PaymentMethodComponent,
    ListProductComponent,

    SubmitSlipComponent,

    HistoryComponent,


  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    HttpModule,
    FormsModule

  ],

  providers: [ProductService,CartService,AuthenticationService,StudentsDataServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
