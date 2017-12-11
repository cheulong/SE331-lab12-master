import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../product/product";
import {CartService} from "../service/cart.service";
import {Item} from "../service/item";
import {Location} from '@angular/common';
import {Router} from "@angular/router";
import {isUndefined} from "util";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  deletePrice:number;
  qtn:number;
  cartItems :Item[] = [];
  totalCartPrice:number;
  voucher:number=0;
  success=false;
  invalid=false;
  constructor(private cartService:CartService,private _location: Location,private router:Router) { }

  ngOnInit() {
    localStorage.getItem('cart')
    this.getItemForCart();
    this.calculateTotalCartPrice();
  }
  getItemForCart(): void{

    this.cartItems = this.cartService.getSelectedItems();

  }
  calculateTotalPrice(item:Item){
    if(item.productQuantity<=0&&item.productQuantity.valueOf()){
      item.productQuantity=1;
    }
    this.qtn=item.productQuantity;
    item.totalPrice=this.qtn*item.product.productPrice;
    this.calculateTotalCartPrice();
  }
  calculateTotalCartPrice(voucher?:number){
    this.totalCartPrice=0;

    for(let item of this.cartItems)
    this.totalCartPrice+=item.totalPrice;
    console.log(this.voucher)
    if(voucher==0.05) {
      this.voucher=voucher

      this.totalCartPrice -= this.totalCartPrice * voucher
    }
  }

  removeItem(i:number,item:Item){
    this.deletePrice=item.totalPrice;
    this.totalCartPrice-=this.deletePrice;
   this.cartItems.splice(i,1);

  }
  backClicked() {
    this._location.back();
  }
  checkOut(){
    this.cartService.setVoucher(this.voucher);
    this.router.navigate(['confirm-page']);
  }
  checkVoucher(code:number){

    if(code==123){

      this.success=true;
      this.invalid=false;
      this.calculateTotalCartPrice(0.05)
    }else {
      this.calculateTotalCartPrice(1)
      this.success = false;
      this.invalid=true;
    }
  }
}
