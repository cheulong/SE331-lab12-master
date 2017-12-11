import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Product} from "../product";
import {ProductService} from "../../service/product.service";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService:ProductService,private cartService:CartService,private router:Router) {}
  cartItems:Product[];
  product:Product;
  isNoData:boolean;
  totalPrice:number;
  qtn:number=1;
  ngOnInit() {
    this.isNoData = false;
    this.route.params
      .switchMap((params:Params) =>  this.productService.getProduct(+params['id']))
      .subscribe((product:Product) => {
          if (product !== null) {
            this.product = product;
            this.totalPrice = product.productPrice;
          }
          else
            this.isNoData = true;
        }
      );

  }
  calculateTotalPrice(){
    if(this.qtn<=0&&this.qtn.valueOf())
      this.qtn=1;
    this.totalPrice=this.qtn*this.product.productPrice;
  }

  addToCart(product:Product):void{
    this.cartService.addItem(this.product,this.qtn,this.totalPrice)
    this.router.navigate(['cart']);
  }
}
