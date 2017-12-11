import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../service/product.service";
import {SlipImage} from "./slipImage";

@Component({
  selector: 'app-submit-slip',
  templateUrl: './submit-slip.component.html',
  styleUrls: ['./submit-slip.component.css']
})
export class SubmitSlipComponent implements OnInit {

  constructor(private productService:ProductService) { }

  ngOnInit() {
  }

  @ViewChild('fileInput') inputEl: ElementRef;
  addSlip(slip:SlipImage){

    let result: any;

    let inputEl: HTMLInputElement = this.inputEl.nativeElement;



  }
  onFileChange(event, product: any) {
    var filename = event.target.files[0].name;
    console.log(filename);
    product.image = filename;
    product.file = event.target.files[0];
  }
}
