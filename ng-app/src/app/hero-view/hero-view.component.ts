import { Component, OnInit } from '@angular/core';
import {Product} from "../product/product";
import {ProductService} from "../service/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hero-view',
  templateUrl: './hero-view.component.html',
  styleUrls: ['./hero-view.component.css']
})
export class HeroViewComponent implements OnInit {
  products: Product[];
  search:string;
  search1:any;
  search2:any;
  value:any;
  constructor(private productService: ProductService, private router: Router ) {
  }

  ngOnInit() {
    this.productService.getProductData()
      .subscribe(products => this.products = products);

  }
  showDetail(product:Product){
    this.router.navigate(['/detail',product.id])
  }
  onSearch(){
    console.log(this.value);
    this.productService.findProduct(this.search,this.value,this.search1,this.search2)
      .subscribe(
        products=>this.products=products
      )
  }

}
