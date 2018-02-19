import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/product.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'fillmybag-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

/**
 * Product component which is displayed in home page
 */
export class ProductComponent {

  @Input() public product: Product;
  @Output() callback: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() showInfo: EventEmitter<Product> = new EventEmitter<Product>();
  
  constructor(private cartService: CartService) { }

  /**
   * callback method to emit event to display modal dailog
   * modal displays all the images related to product
   */
  public onViewClick(product: Product): void {
    this.callback.emit(product);
  }

  /**
   * Add product in the cart
   */
  public addToCart(product: Product): void {
    this.cartService.addProduct(product, 1);
    this.showInfo.emit();
  }
}
