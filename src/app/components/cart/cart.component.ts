import {
  Component,
  OnInit,
  ElementRef,
  TemplateRef,
} from '@angular/core';

import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products/products.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'fillmybag-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

/**
 * cart component
 */
export class CartComponent implements OnInit {
  public modalRef: BsModalRef;
  public products: Array<Product> = [];
  public netTotalPrice: number = 0;
  public productError: boolean;
  public maxProducts: number;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private modalService: BsModalService,
    private el: ElementRef,
  ) { }
  
  /**
   * component life cycle hook
   */
  public ngOnInit(): void {
    this.productError = false;
    this.products = this.cartService.getProductsInCart();
    this.netTotalPrice = this.cartService.getTotalPrice() - this.cartService.discountCard;
  }

  /**
   * remove product from cart
   */
  public removeProduct(product: Product): void {
    this.cartService.removeProductFromCart(product);
    this.products = this.cartService.getProductsInCart();
    this.netTotalPrice = this.cartService.getTotalPrice() - this.cartService.discountCard;
  }
  
  /**
   * to open modal dailog
   */
  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  /**
   * select voucher
   */
  public selectVoucher(val: number): void {
    this.cartService.discountCard = val;
  }

  /**
   * hide voucher modal and apply discount if available
   */
  public hideVoucherModal(): void {
    this.netTotalPrice = this.cartService.getTotalPrice() - this.cartService.discountCard;
    this.modalRef.hide();
  }

  /**
   * handler for product item count increase or decrease
   * show error message in case products added out of quantity
   */
  public onValueChange(val: number, product: Product, ev: Event) {
    if (Number(val) <= (product.itemsInCart + product.quantity)) {
      this.cartService.increaseOrDecreaseItem(Number(val), product);
      this.netTotalPrice = this.cartService.getTotalPrice() - this.cartService.discountCard;
    } else {
      const className: string = 'form-control-'+product.id;
      this.el.nativeElement.getElementsByClassName(className)[0].value = product.itemsInCart;
      this.maxProducts = product.itemsInCart + product.quantity;
      this.productError = true;
      return false;
    }
  }

}
