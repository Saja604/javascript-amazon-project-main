function Cart(localStorageKey){ 
  const cart = {
    cartItems: undefined,

    updateDeliveryOption(productId, deliveryOptionId) {
        const matchingItem = this.cartItems.find((item) => {
                            return item.productId === productId;
                        });
        console.log(matchingItem);
        matchingItem.deliveryOptionId= deliveryOptionId;
        
        this.saveToStorage();
    },

    loadFromStorage(){
      this.cartItems=JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

    saveToStorage(){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(pId){
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
    },
    removeFromCart(pId){
      let cartItems2=this.cartItems.filter(item => item.productId!==pId);
      this.cartItems=cartItems2;
      localStorage.setItem(localStorageKey, JSON.stringify(cartItems2));
    }
  }
  return cart;
}
const cart = Cart('cart-oop');
cart.loadFromStorage();

console.log(cart);