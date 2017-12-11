import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  bank=true;
  credit=false;
  paypal=false;
  constructor() { }

  ngOnInit() {
  }
  payByBank(){

    this.credit=false;
    this.paypal=false;
    this.bank=true;
  }
  payByCredit(){
    this.bank=false;

    this.paypal=false;
    this.credit=true;
  }
  payByPaypal(){
    this.bank=false;
    this.credit=false;
    this.paypal=true;
  }

}
