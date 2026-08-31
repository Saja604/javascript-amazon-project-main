import {addToCart, cartItems, loadFromStorage} from '../scripts/amazon.js';

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
                quantity:1,
                deliveryOptionId: '1'}
            ]);
         });
        loadFromStorage();
        addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        expect(cartItems.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cartItems[0].productId).toEqual('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        expect(cartItems[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
         });
        
        console.log(localStorage.getItem('cartItems'));
        // reload the cart again based on the mimick local Storage, and the setItem will be mimicked too
        loadFromStorage();
        addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        expect(cartItems.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cartItems[0].productId).toEqual('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        expect(cartItems[0].quantity).toEqual(1);
    });
})