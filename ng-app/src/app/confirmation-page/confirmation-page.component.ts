import { Component, OnInit } from '@angular/core';
import {CartService} from "../service/cart.service";
import {Location} from '@angular/common';
import {Router} from "@angular/router";
import {Item} from "../service/item";
@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {
  cartItems :Item[] = [];
  totalCartPrice:number;
  constructor(private cartService:CartService,private _location: Location,private router:Router) { }

  ngOnInit() {
    this.getItemForCart();
    this.calculateTotalCartPrice();
  }
  getItemForCart(): void{
    this.cartItems = this.cartService.getSelectedItems();

  }
  calculateTotalCartPrice(){
    this.totalCartPrice=0;
    for(let item of this.cartItems)
      this.totalCartPrice+=item.totalPrice;

    this.totalCartPrice-=this.totalCartPrice*this.cartService.getVoucher();

  }
  backClicked() {
    this._location.back();
  }
  payment(){
    this.router.navigate(['payment']);
  }
}
