import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../service/product.service";
import {SlipImage} from "./slipImage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-submit-slip',
  templateUrl: './submit-slip.component.html',
  styleUrls: ['./submit-slip.component.css']
})
export class SubmitSlipComponent implements OnInit {
  slip: any={};
  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit() {
  }

  @ViewChild('fileInput') inputEl: ElementRef;
  addSlip(slip:SlipImage){

    let result : SlipImage;
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    this.productService.addSlip(slip, inputEl.files.item(0))
      .subscribe(resultProduct => {
        result = resultProduct
        if (result != null) {
          this.router.navigate(['/view-product']);
        } else {
          alert('Error in adding the slip');
        }
      });



  }
  onFileChange(event, slip: any) {
    var filename = event.target.files[0].name;
    console.log(filename);
    slip.image = filename;
    slip.file = event.target.files[0];
  }
}
