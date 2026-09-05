class Cart {
  // these are fields or properties
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
      const matchingItem = this.cartItems.find((item) => {
                          return item.productId === productId;
                      });
      console.log(matchingItem);
      matchingItem.deliveryOptionId= deliveryOptionId;
      
      this.saveToStorage();
  };

  #loadFromStorage(){
    this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  };

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  };

  addToCart(pId){
    console.log('addToCart called with pId:', pId);
    const matchingItem = this.cartItems.find((item) => {
        return item.productId === pId;
    });
    
    if(matchingItem){
        matchingItem.quantity+=1;
    }
    else{
        this.cartItems.push({productId: pId, quantity: 1, deliveryOptionId: '1'});
    }
    
      this.saveToStorage();
  };
  removeFromCart(pId){
    let cartItems2=this.cartItems.filter(item => item.productId!==pId);
    this.cartItems=cartItems2;
    localStorage.setItem(this.#localStorageKey, JSON.stringify(cartItems2));
  }
}

const cart = new Cart('cart-class');
console.log(cart);
// this will tell us if cart is of type Cart
console.log (cart instanceof Cart);