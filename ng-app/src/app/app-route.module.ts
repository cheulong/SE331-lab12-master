import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ViewProductComponent} from "./product/view-product/view-product.component";
import {HeroViewComponent} from "./hero-view/hero-view.component";
import {AuthenticateComponent} from "./authentication/authenticate/authenticate.component";
import {CartComponent} from "./cart/cart.component";
import {ConfirmationPageComponent} from "./confirmation-page/confirmation-page.component";
import {PaymentMethodComponent} from "./payment-method/payment-method/payment-method.component";
import {ListProductComponent} from "./product/list-product/list-product.component";
import {SubmitSlipComponent} from "./submit-slip/submit-slip.component";
import {HistoryComponent} from "./history/history.component";
import {TranDetailComponent} from "./tran-detail/tran-detail.component";

const appRoutes: Routes=[
  { path: '', redirectTo: 'hero-view', pathMatch: 'full' },
  { path: 'product',component: HeroViewComponent},

  {
    path: 'hero-view',component:HeroViewComponent
  },
  {
    path: 'cart',component:CartComponent
  },
  {
    path: 'authentication',component:AuthenticateComponent
  },
  {
    path: 'confirm-page',component:ConfirmationPageComponent
  },
  {
    path: 'detail/:id',component:ViewProductComponent
  },
  {
    path: 'tranDetail/:id',component:TranDetailComponent
  },
  {
    path: 'list-product',component:ListProductComponent
  },
  {
    path: 'slip',component:SubmitSlipComponent
  },
  {
    path: 'payment',component:PaymentMethodComponent
  },
  {
    path: 'history',component:HistoryComponent
  },
  {
    path: '**',component:HeroViewComponent
  }

];
@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRouteModule{

}
