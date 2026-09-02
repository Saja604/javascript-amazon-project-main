import {renderOrderSummary} from '../scripts/orderSummary.js'
import {loadFromStorage, cartItems} from '../scripts/amazon.js';
import {renderCart} from '../scripts/checkout.js';

// describe('test suite: renderOrderSummary', () => {
//     it('displays the cart', () => {
//         document.querySelector('.js-test-container').innerHTML=`
//             <div class="items-quantity"></div>
//             <div class="js-items-price"></div>
//             <div class="js-shipping-price"></div>
//             <div class="js-before-tax"></div>
//             <div class="js-estimated-tax"></div>
//             <div class="js-order-total"></div>   
//         `;
//     spyOn(localStorage, 'setItem');

//     spyOn(localStorage, 'getItem').and.callFake(() => {
//         return JSON.stringify([
//             {productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
//             quantity:1,
//             deliveryOptionId: '1'},
//             {
//             productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
//             quantity: 1,
//             deliveryOptionId: '1'
//             }
//         ]);
//         });
//     loadFromStorage();
//     console.log(localStorage.getItem('cartItems'));

    
//     renderOrderSummary();

//     });
// });
describe ('test render Cart', () => {
    it('display the cart', () => {
        spyOn(localStorage, 'setItem');

        const id1='8c9c52b5-5a19-4bcb-a5d1-158a74287c53';
        const id2='dd82ca78-a18b-4e2a-9250-31e67412f98d';
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {productId: id1,
                quantity:3,
                deliveryOptionId: '1'},
                {
                productId: id2,
                quantity: 1,
                deliveryOptionId: '1'
                }
            ]);
            });
        loadFromStorage();
        console.log(localStorage.getItem('cartItems'));
        renderCart();

        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${id1}`).innerText).toContain(`Quantity: ${cartItems[0].quantity}`);
        
    });
});