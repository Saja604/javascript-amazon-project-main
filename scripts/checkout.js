let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

import { products } from "../data/products.js";
import {deliveryOptions} from "./deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderOrderSummary } from "./orderSummary.js";
import { calcQuantity } from "./amazon.js";

renderCart();
console.log(cartItems);

function renderCart(){
    const cartQuantity=calcQuantity();
    document.querySelector('.return-to-home-link').innerHTML=cartQuantity;

    renderOrderSummary(cartItems);

    let cartList='';
    cartItems.forEach((item, index) =>{
        const product=products.find((productObject) =>{
            return item.productId===productObject.id;
        });
        cartList+=`
            <div class="cart-item-container">
                <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${product.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-price">
                        $ ${(product.priceCents/100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
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
                
                const matchingItem = cartItems.find((item) => {
                    return item.productId === deliveryOption.dataset.productId;
                });
                console.log(matchingItem);
                matchingItem.deliveryOptionId= deliveryOption.dataset.deliveryId;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                renderOrderSummary(cartItems)
            });
        });
    });


    document.querySelectorAll('.delete-quantity-link').forEach((deleteButton) =>{
        deleteButton.addEventListener('click', () =>{
            // const deleteID=deleteButton.dataset.deleteID;
            // cartItems.splice(index, 1);
            const deleteId=deleteButton.dataset.id;
            cartItems=cartItems.filter(item => item.productId!==deleteId);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
