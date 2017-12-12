import {Cart} from "./cart";
import {Product} from "../product/product";
import {Item} from "./item";
import {ANY_STATE} from "@angular/animations/browser/src/dsl/animation_transition_expr";

export class CartService{
  getVoucherPrice:number=0;
  selectedItems: Item[] = [];
  addItem(product?: Product, productQuantity?: number,totalPrice?:number): void {


    if(localStorage.getItem("cart")){
      this.selectedItems=JSON.parse(localStorage.getItem("cart"));
    }else{
      this.selectedItems=[];
    }
    this.selectedItems.push(new Item(product,productQuantity,totalPrice));
    localStorage.setItem("cart",JSON.stringify(this.selectedItems));
    }
  getSelectedItems():Item[]{
    return JSON.parse(localStorage.getItem("cart"));
  }
  setVoucher(voucher:number):any{
    if(voucher==0.05)
    this.getVoucherPrice=voucher;
    else this.getVoucherPrice=0;


  }
  getVoucher():number{
    return this.getVoucherPrice;
  }
}
