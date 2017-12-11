import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers, Response,URLSearchParams} from "@angular/http";
import {Product} from "../product/product";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) {
  }

  getProductData() {
    let productArray: Product[];
    return this.http.get('http://localhost:8080/product')
      .map(res => res.json());
  }

  getProduct(id: number) {
    let product: Product;
    return this.http.get('http://localhost:8080/product/' + id)
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            return res.json()
          }
          if (res.status === 204) {
            return null;
          }
        }
      })
      .catch((error: any) => {
        if (error.status === 500) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 400) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 409) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 406) {
          return Observable.throw(new Error(error.status));
        }
        return error;
      })
      ;
  }

  addProduct(product:Product,file:any):Observable<Product>{
    const  formData = new FormData();
    let fileName : string;

    formData.append('file',file);
    return this.http.post('http://localhost:8080/product/images',formData).flatMap(fileName=>{
      product.image = fileName.text();
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, method: 'post'});
      let body = JSON.stringify(product);
      return this.http.post('http://localhost:8080/product', body, options)
        .map(res => {
          return res.json()
        })
        .catch((error: any) => {
          return Observable.throw(new Error(error.status))
        })
    })
  }

  // addProduct(product: Product, file: any) {
  //   let formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post('http://localhost:8080/product/images', formData)
  //     .flatMap(filename => {
  //       product.image = filename.text();
  //       let headers = new Headers({'Content-Type': 'application/json'});
  //       let options = new RequestOptions({headers: headers, method: 'post'});
  //       let body = JSON.stringify(product);
  //       return this.http.post('http://localhost:8080/product', body, options)
  //         .map(res => {
  //           return res.json()
  //         })
  //         .catch((error: any) => {
  //           return Observable.throw(new Error(error.status))
  //         })
  //     })
  // }

  //let headers = new Headers({'Content-Type': 'application/json'});
  deleteProduct(id: number){

    return this.http.delete("http://localhost:8080/product/" + id).toPromise()
      .then((res)=>res.json())
        .catch(this.handleError);
      }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  updateProduct(product:Product,file?: any){
    let formData = new FormData();


console.log(file);
    formData.append('file', file);
    return this.http.post('http://localhost:8080/product/images', formData)
      .flatMap(filename => {
        product.image = file;
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, method: 'post'});
        let body = JSON.stringify(product);
        return this.http.put('http://localhost:8080/product', body, options)
          .map(res => {
            return res.json()
          })
          .catch((error: any) => {
            return Observable.throw(new Error(error.status))
          })
      })
  }
  findProduct(search:string,value:any,search1?:any,search2?:any){
    let product:Product;
    let params:URLSearchParams=new URLSearchParams();
    params.set('search',search);
    if(value==="Name") {
      return this.http.get('http://localhost:8080/product/search/name/' + search)
        .map((res: Response) => {
          if (res) {
            if (res.status === 200) {
              return res.json()
            }
            if (res.status === 204) {
              return null;
            }
          }
        })
        .catch((error: any) => {
          if (error.status === 500) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
          return error;
        })
        ;
    }if(value==="Description") {
      return this.http.get('http://localhost:8080/product/search/des/' + search)
        .map((res: Response) => {
          if (res) {
            if (res.status === 200) {
              return res.json()
            }
            if (res.status === 204) {
              return null;
            }
          }
        })
        .catch((error: any) => {
          if (error.status === 500) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
          return error;
        })
        ;
    }if(value==="Price") {
      return this.http.get('http://localhost:8080/product/search/price/' + search1+'/'+search2)
        .map((res: Response) => {
          if (res) {
            if (res.status === 200) {
              return res.json()
            }
            if (res.status === 204) {
              return null;
            }
          }
        })
        .catch((error: any) => {
          if (error.status === 500) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
          return error;
        })
        ;
    }
  }
}
