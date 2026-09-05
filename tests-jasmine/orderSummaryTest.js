import {renderOrderSummary} from '../scripts/orderSummary.js'
import {loadFromStorage, cartItems} from '../scripts/cart.js';
import {renderCart} from '../scripts/checkout.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';

// since we are doing the same setup for each test, we can use hook

describe ('test render Cart', () => {
    const id1='8c9c52b5-5a19-4bcb-a5d1-158a74287c53';
    const id2='dd82ca78-a18b-4e2a-9250-31e67412f98d';
    const id3= '36c64692-677f-4f58-b5ec-0dc2cf109e27';

    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        })
    });
    
    beforeEach(() => {
        let fakeCart=[{productId: id1,
                quantity:3,
                deliveryOptionId: '1'},
                {
                productId: id2,
                quantity: 1,
                deliveryOptionId: '1'
                },
                {
                productId: id3,
                quantity: 1,
                deliveryOptionId: "1"}
            ];
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify(fakeCart);
            });
        spyOn(localStorage, 'setItem').and.callFake((key, value) => {
            if (key === 'cartItems') {
                fakeCart= JSON.parse(value);
            }
        });

        loadFromStorage();
        console.log(`cart before delete: ${localStorage.getItem('cartItems')}`);
        renderCart();
    });
    it('display the cart', () => {
        
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(3);

        expect(
            document.querySelector(`.js-product-quantity-${id1}`).innerText).toContain(`Quantity: ${cartItems[0].quantity}`);
        
    });
    it('check delete button', () => {
        
        document.querySelector(`.delete-quantity-link[data-id="${id1}"]`).click();
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(2);
    });
});