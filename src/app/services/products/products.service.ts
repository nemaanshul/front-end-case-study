import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Product } from '../../models/product.model';

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

/**
 * Product service
 */
@Injectable()
export class ProductsService {

    private products: Product[];
    private jsonPath: string = './assets/products.json';
    constructor(private http: HttpClient) { }

    /**
     * load all the products from json
     */
    public loadProducts(): Observable<any> {
        return this.http.get(this.jsonPath);
    }

    /**
     * set all the products in a list once available
     */
    public setProducts(products: Product[]): void {
        this.products = products;
    }

    /**
     * get all the products
     */
    public getProducts(): Product[] {
        return this.products;
    }
}
