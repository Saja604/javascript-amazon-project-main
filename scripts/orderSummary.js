import { calcQuantity } from "./amazon.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "./deliveryOptions.js";
import {cartItems, loadFromStorage} from "./cart.js";
import {addOrder} from '../data/orders.js';

export function renderOrderSummary(){
    loadFromStorage();
    console.log(localStorage.getItem('cartItems'));

    const cartQuantity=calcQuantity();
    console.log(cartQuantity);
    
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
    const totalBeforeTax=itemsPrice+shippingPrice;
    const estimatedTax=totalBeforeTax*0.1;
 
    const orderTotal=totalBeforeTax+estimatedTax;
    
    const html=`
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="items-quantity">Items (${cartQuantity}):</div>
            <div class="payment-summary-money js-items-price">$ ${(itemsPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shipping-price">$ ${(shippingPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money js-before-tax">$ ${(totalBeforeTax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money js-estimated-tax">$ ${(estimatedTax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-order-total">$ ${(orderTotal/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `
    document.querySelector('.payment-summary').innerHTML=html;

    document.querySelector('.js-place-order').addEventListener('click', async () => {
     // we need to send our cart to the backend in order to create an order
     try{
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cartItems
        })
      });
      const order = await response.json();
      addOrder(order);
     } catch (error) {
      console.log('unexpeced error. Try again later.')
     }

     window.location.href = 'orders.html';
    });  
}

