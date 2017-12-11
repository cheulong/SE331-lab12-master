import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../../service/product.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  errorMessage: any;
  isEdit=false;
  products: Product[];
  isAdd=false;
  product: any={};

  constructor(private productService: ProductService,private router:Router) {
  }

  ngOnInit() {
    this.productService.getProductData()
      .subscribe(products => this.products = products);
  }

  deleteProduct(product:any){
    this.productService.deleteProduct(product.id);
    this.refresh();
  }
  updateProduct(product:Product,file:string){
    let result: Product;

    let inputEl: HTMLInputElement = this.inputEl.nativeElement;

    this.productService.updateProduct(product,file)
      .subscribe(resultProduct => {
        result = resultProduct
        if (result != null){
          this.router.navigate(['/list-product']);
        }else{
          alert("Error in adding the product");
        }
      });



  }
  addProduct(){
    this.isAdd=!this.isAdd;
  }

  @ViewChild('fileInput') inputEl: ElementRef;

  addProductObject(product:Product){
    console.log(product)
    let result: Product;
    console.log(product)
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;

    this.productService.addProduct(product,inputEl.files.item(0))
      .subscribe(resultProduct => {
        result = resultProduct
        if (result != null){
          this.router.navigate(['/list-product']);
        }else{
          alert("Error in adding the product");
        }
      });

  }

  onFileChange(event, product: any) {
    var filename = event.target.files[0].name;
    console.log(filename);
    product.image = filename;
    product.file = event.target.files[0];
  }
  refresh(){
    window.location.reload();
  }
}
