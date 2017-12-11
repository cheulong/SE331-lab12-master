  import {Item} from "./item";
  import {Product} from "../product/product";
  import {forEach} from "@angular/router/src/utils/collection";

  export class Cart{
  items: Item[];
  constructor(){
  }
  getItem(item:Item){
    this.items.push(item);
  }
  showItem(){
      return this.items;
    }
  }

