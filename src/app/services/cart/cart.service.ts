import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../products/products.service';

@Injectable() export class CartService {

    public productsInCart: Array<Product> = [];
    public totalItemsInCart: number = 0;
    public discountCard: number = 0;
    constructor(private productsService: ProductsService) { }

    /**
     * add selected product in the cart
     */
    public addProduct(product: Product, quantity: number): Product {
        if (!this.productExists(product) && quantity) {
            this.productsInCart.push(product);
        }
        product.quantity += -quantity;
        product.itemsInCart++;
        this.totalItemsInCart++;
        console.log(this.productsInCart);
        return product;
    }

    /**
     * check if selected product already exists in the cart
     */
    private productExists(product: Product): boolean {
        for (let x in this.productsInCart) {
            if (this.productsInCart.hasOwnProperty(x) && this.productsInCart[x] === product) {
                return true;
            }
        }
        return false;
    }

    /**
     * remove product from cart
     */
    public increaseOrDecreaseItem(val: number, product: Product): void {
        const products: Product[] = this.productsInCart;
        for (const el of products) {
            if (el.id === product.id) {
            const itemsChanged: number = product.itemsInCart - val;
            product.quantity += itemsChanged;
            this.totalItemsInCart -= itemsChanged;
            product.itemsInCart = Number(val);
            }
        }
        
        if (this.discountCard) {
            this.checkAndReplaceVoucher(this.discountCard);
        }
    }

    /**
     * remove product from cart
     */
    public removeProductFromCart(product: Product): void {
        const products: Product[] = this.productsService.getProducts();
        for (const el of products) {
            if (el.id === product.id) {
                el.quantity += product.itemsInCart;
                this.totalItemsInCart -= product.itemsInCart;
                el.itemsInCart = 0;
            }
        }

        if (this.discountCard) {
            this.checkAndReplaceVoucher(this.discountCard);
        }
    }

    /**
     * returns product list in card
     */
    public getProductsInCart(): Product[] {
        return this.productsInCart
            .filter((product: Product) => {
                return product.itemsInCart > 0;
            })
    }

    /**
     * calculate and return total price of products in cart
     */
    public getTotalPrice(): number {
        const productsInCart: Product[] = this.getProductsInCart();
        let totalPrice: number = 0;
        for (let product of productsInCart) {
            totalPrice += product.price * product.itemsInCart;
        }
            return totalPrice;
    }


    /**
     * check if cart contains any footwear item
     */
    public isFootwearInCart(): boolean {
        for (let product of this.getProductsInCart()) {
            if (product.product_category === 'footwear') {
                return true;
            }
        }
        return false;
    }

    /**
     * check if offer is valid
     * minimum total amount should be more than 75 pounds
     * cart must contain atleast one footwear item
     */
    public isOfferValid(offer: string): boolean {
        switch (offer) {
        case 'offer-10': 
        default: {
            return this.getTotalPrice() > 50;
            }
        case 'offer-15': {
            return this.getTotalPrice() > 75 && this.isFootwearInCart();
         }
        }
    }


    /**
     * check if after removing product offer still remains
     * if some offer gets invalid than offer can be replaced by other
     */
    private checkAndReplaceVoucher(discount: number): void {
        const offer: string = 'offer-'+discount;
        if(!this.isOfferValid(offer)) {
            alert('your offer became invalid pelase select another');
            this.discountCard = 0;
        }
    }
}
