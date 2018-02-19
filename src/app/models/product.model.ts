/**
 * Product Model
 */
export class Product {
    public discounted_price: number = null;
    public id: number;
    public itemsInCart: number;
    public name: string;
    public price: number;
    public product_category: string;
    public quantity: number;
    public sub_category: string;
    public _products: string[];
}