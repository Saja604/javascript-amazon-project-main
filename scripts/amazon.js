import {products} from '../data/products.js';

if (document.querySelector('.products-grid')) {
    renderProducts();
}
export let cartItems;
loadFromStorage();
export function loadFromStorage(){
  cartItems=JSON.parse(localStorage.getItem('cartItems')) || [];
}

function renderProducts(){
    let htmlList= '';
    products.forEach((product) => {
        let html= `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $ ${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
        `;
        htmlList+=html;
    });
    document.querySelector('.products-grid').innerHTML=htmlList;
}


document.querySelectorAll('.add-to-cart-button').forEach((addButton, index) => { 
    addButton.addEventListener('click', () =>{
        const addedItem=products[index];
        
        addToCart(addedItem.id);

        console.log(cartItems);

        const cartQuantity=calcQuantity();
        document.querySelector('.cart-quantity').innerHTML=cartQuantity;
    })
});

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
  
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export function calcQuantity(){
    let cartQuantity=0;
        cartItems.forEach((item) =>{
            cartQuantity+=item.quantity;
        })
    return cartQuantity;
}