export let cartItems;
export function updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = cartItems.find((item) => {
                        return item.productId === productId;
                    });
    console.log(matchingItem);
    matchingItem.deliveryOptionId= deliveryOptionId;
    
    saveToStorage();
};

export function loadFromStorage(){
  cartItems=JSON.parse(localStorage.getItem('cartItems')) || [];
}

export function saveToStorage(){
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export function addToCart(pId){
  const matchingItem = cartItems.find((item) => {
      return item.productId === pId;
  });
  
  if(matchingItem){
      matchingItem.quantity+=1;
  }
  else{
      cartItems.push({productId: pId, quantity: 1, deliveryOptionId: '1'});
  }
  
    saveToStorage();
}
export function removeFromCart(pId){
  let cartItems2=cartItems.filter(item => item.productId!==pId);
  cartItems=cartItems2;
  localStorage.setItem('cartItems', JSON.stringify(cartItems2));
}

export function loadCart(functionToCallAfterLoad){ 
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    functionToCallAfterLoad();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}