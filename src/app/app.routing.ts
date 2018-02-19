import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot([
            {
                component: HomeComponent,
                path: "home"
            },
            {
                component: CartComponent,
                path: "cart"
            },
            {
                component: HomeComponent,
                path: "**"
            }])
    ]
})
export class AppRoutingModule { }
