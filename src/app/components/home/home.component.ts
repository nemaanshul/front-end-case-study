import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from "rxjs/Observable";

import { ProductsService } from '../../services/products/products.service';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'fillmybag-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/**
 * home component to display all the available products
 */
export class HomeComponent implements OnInit {
    public products: Product[];
    public productName: string;
    public productImages: string[];
    public modalRef: BsModalRef;
    public hideInfo: boolean = true;
    constructor(
        private modalService: BsModalService,
        private productService: ProductsService,
        public cartService: CartService,
    ) {}

    /**
     * angular life cycle hook
     * using to set products data
     */
    public ngOnInit(): void {
        this.products = this.productService.getProducts();
        if (!this.products) {
            this.productService.loadProducts().subscribe((data: Product[]) => {
                this.products = data;
                this.productService.setProducts(data);
                console.log(this.products);
            });
        }
    }

    /**
     * to open modal dailog
     */
    public openModal(template: TemplateRef < any > , product: Product): void {
        this.productName = product.name;
        this.productImages = product._products;
        this.modalRef = this.modalService.show(template);
    }

    /**
     * info bar is displayed every time when product is added in the cart
     * info bar will hide again after interval
     */
    public displayInfoBar(): void {
        this.hideInfo = false;
        setTimeout(() => {
            this.hideInfo = true;
        }, 500);
    }
}