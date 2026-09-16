import {products, loadProducts} from '../data/products.js';
import {cartItems, loadFromStorage, saveToStorage, addToCart} from './cart.js';
// import {formatCurrency} from './money.js';

loadProducts(() => {
  if (document.querySelector('.products-grid')) {
    renderProducts();
  }
});

loadFromStorage();

console.log('cartItems after loadFromStorage:', cartItems);
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
              src="${product.getStarUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $ ${product.getPrice()}
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

          <!-- polymorphism: calling a function without knowing the class, instead of using if statement -->
          <div>
            ${product.extraInfoHTML()}
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

    document.querySelectorAll('.add-to-cart-button').forEach((addButton, index) => {
      addButton.addEventListener('click', () => {
        const addedItem=products[index];

        const quantityOption = addButton.parentElement.querySelector('.product-quantity-container select').value;
        const quantity = Number(quantityOption);
        console.log(quantity);

        addToCart(addedItem.id, quantity);

        document.querySelector('.cart-quantity').innerHTML=calcQuantity();

        const message = addButton.parentElement.querySelector('.added-to-cart')
        message.style.opacity=1;

        setTimeout(() => {
             message.style.opacity=0;
          }, 
          3000
        );
      });
    });
  }

export function calcQuantity(){
    let cartQuantity=0;
        cartItems.forEach((item) =>{
            cartQuantity+=item.quantity;
        })
    return cartQuantity;
}