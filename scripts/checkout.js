// let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

import { products, loadProducts, loadProductsFetch } from "../data/products.js";
import {deliveryOptions} from "./deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderOrderSummary } from "./orderSummary.js";
import { calcQuantity } from "./amazon.js";
import { cartItems, updateDeliveryOption, loadFromStorage, removeFromCart, saveToStorage, loadCart } from "./cart.js";
import '../data/products.js'
// import './cart-class.js'; 
// import '../data/backend-practice.js';

Promise.all([
   loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('value2');
        });
    })
]).then((values) => {
    console.log(values);
    renderCart();
});
// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('we can use this in then');
//     });
// }).then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     }); 
// }).then (() => {
//     renderCart()
// });

// multiple callbacks cause a lot of nesting, promises solve this problem.
// loadProducts(() => {
//     loadCart(() => {
//         if (document.querySelector('.order-summary')) {
//             renderCart();
//         }
//     });
// });

// renderCart();
console.log(cartItems);

export function renderCart(){
    loadFromStorage();
    console.log(localStorage.getItem('cartItems'));

    const cartQuantity=calcQuantity();
    document.querySelector('.return-to-home-link').innerHTML=cartQuantity;

    renderOrderSummary();

    let cartList='';
    cartItems.forEach((item, index) =>{
        const product=products.find((productObject) =>{
            return item.productId===productObject.id;
        });
        cartList+=`
            <div class="cart-item-container">
                <div class="delivery-date">
                    Delivery date: ${showDeliveryDate(item.deliveryOptionId)}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${product.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-price">
                        $ ${product.getPrice()}
                    </div>
                    <div class="product-quantity js-product-quantity-${product.id}">
                        <span>
                        Quantity: <span class="quantity-label">${item.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                        Update
                        </span>
                        <span class="delete-quantity-link link-primary" data-id="${item.productId}">
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    <div class="delivery-options-container">
                    ${deliveryOptionFunction(index)}</div>
                    </div>
                </div>
                </div>
        `
    });
    document.querySelector('.order-summary').innerHTML=cartList;

    cartItems.forEach((item, index) =>{
        const deliveryOptions=document.querySelectorAll(`input[name="delivery-option-${index}"]`);
        deliveryOptions.forEach((deliveryOption) => {
            deliveryOption.addEventListener('click', () =>{
                deliveryOption.closest('.cart-item-container').querySelector('.delivery-date').innerHTML= `Delivery date: ${deliveryOption.dataset.date}`;

                console.log('Searching for ID:', 
                deliveryOption.dataset.productId);

                const deliveryOptionId=deliveryOption.dataset.deliveryId;
                
                updateDeliveryOption(deliveryOption.dataset.productId, deliveryOptionId); 

                renderOrderSummary(cartItems)
            });
        });
    });


    document.querySelectorAll('.delete-quantity-link').forEach((deleteButton) =>{
        deleteButton.addEventListener('click', () =>{
            // console.log(`cart before delete: ${localStorage.getItem('cartItems')}`);
            const deleteId=deleteButton.dataset.id;
            removeFromCart(deleteId);
            
            // console.log(`cart after delete: ${localStorage.getItem('cartItems')}`);
            renderCart();
        });
    }); 
    
};

function calcShipping(dOption) {
    if(dOption.priceCents===0){
        return 'FREE';
    }
    else{
        return `$ ${dOption.priceCents/100} -`;
    }
}
function deliveryOptionFunction (index){
    let html='';
    deliveryOptions.forEach((dOption, i)=>{
        const today=dayjs();
        const deliveryDate=today.add(dOption.deliveryDays, 'days');
        const deliveryDateFormat=deliveryDate.format('dddd, MMMM D');
        
        const isChecked= cartItems[index].deliveryOptionId===dOption.id;
        html+=`
            <div class="delivery-option">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${index}"
                data-date="${deliveryDateFormat}"
                data-delivery-id="${dOption.id}"
                data-product-id="${cartItems[index].productId}">
                <div>
                    <div class="delivery-option-date">
                        ${deliveryDateFormat}
                    </div>
                    <div class="delivery-option-price">
                        ${calcShipping(dOption)} Shipping
                    </div>
                </div>
            </div>
        `
    });
    return html;
}
function showDeliveryDate(deliveryOptionId){
    const dOption=deliveryOptions.find((option) => {
        return option.id===deliveryOptionId;
    })
    const today=dayjs();
    const deliveryDate=today.add(dOption.deliveryDays, 'days');
    const deliveryDateFormat=deliveryDate.format('dddd, MMMM D');
    return deliveryDateFormat;
}