import {Product} from "../product/product";

export class Item{
  product: Product;
  productQuantity: number;
  totalPrice:number;
  constructor(product:Product,productQtn:number,totalPrice:number) {
    this.product=product;
    this.productQuantity=productQtn;
    this.totalPrice=totalPrice;
  }
}
