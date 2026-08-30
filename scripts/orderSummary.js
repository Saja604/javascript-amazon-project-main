import { calcQuantity } from "./amazon.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "./deliveryOptions.js";

export function renderOrderSummary(cartItems){
    const cartQuantity=calcQuantity();
    document.querySelector('.items-quantity').innerHTML=`Items (${cartQuantity}):`;

    let itemsPrice=0;
    let shippingPrice=0;
    cartItems.forEach(item => {
        const product=products.find((productObject) =>{
                    return item.productId===productObject.id;
                });
        const itemPrice=(product.priceCents)*(item.quantity);
        itemsPrice+=itemPrice;

        const deliveryOption=deliveryOptions.find((option) =>{
                    return item.deliveryOptionId===option.id;
                });
        shippingPrice+=deliveryOption.priceCents;
    });
    document.querySelector('.js-items-price').innerHTML=`$ ${(itemsPrice/100).toFixed(2)}`;
    document.querySelector('.js-shipping-price').innerHTML=`$ ${(shippingPrice/100).toFixed(2)}`;

    const totalBeforeTax=itemsPrice+shippingPrice;
    const estimatedTax=totalBeforeTax*0.1;

    document.querySelector('.js-before-tax').innerHTML=`$ ${(totalBeforeTax/100).toFixed(2)}`;
    document.querySelector('.js-estimated-tax').innerHTML=`$ ${(estimatedTax/100).toFixed(2)}`;
    
    const orderTotal=totalBeforeTax+estimatedTax;
    document.querySelector('.js-order-total').innerHTML=`$ ${(orderTotal/100).toFixed(2)}`;
}