import { Injectable } from '@angular/core';
import { VendingMachine } from '../domain/VendingMachine';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/domain/Product';

@Injectable()
export class VendingMachinesService {

  readonly _getAllMachinesEndpoint = 'https://localhost:7147/api/VendingMachines';
  readonly _getAllMachinesDictEndpoint = 'https://localhost:7147/api/VendingMachines/Dict';
  readonly _getAllProductsEndpoint = 'https://localhost:7147/api/Products';

  constructor(private http: HttpClient) {}

    getVendingMachines(): Observable<VendingMachine[]> {
      const headers = new HttpHeaders().set('accept', 'text/plain');
      return this.http.get<VendingMachine[]>(this._getAllMachinesEndpoint, {headers});
    }

    getVendingMachinesDict(): Observable<Map<Number, VendingMachine>> {
      const headers = new HttpHeaders().set('accept', 'text/plain');
      return this.http.get<Map<Number, VendingMachine>>(this._getAllMachinesDictEndpoint, {headers});
    }

    getProducts(): Observable<Product[]> {
      const headers = new HttpHeaders().set('accept', 'text/plain');
      return this.http.get<Product[]>(this._getAllProductsEndpoint, {headers});
    }

    // getProductsWithOrdersData() {
    //     // TODO: What is this
    // }

    // getProductsMini() {
    //     return Promise.resolve(this.getVendingMachinesData().slice(0, 5));
    // }

    // getProductsSmall() {
    //     return Promise.resolve(this.getVendingMachinesData().slice(0, 10));
    // }

    // getProducts() {
    //     return Promise.resolve(this.getVendingMachinesData());
    // }

    // getProductsWithOrdersSmall() {
    //     return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    // }

    // getProductsWithOrders() {
    //     return Promise.resolve(this.getProductsWithOrdersData());
    // }
};
