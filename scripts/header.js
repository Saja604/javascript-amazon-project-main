 import {calcQuantity} from './amazon.js';

fetch('header.html').then((response) => {
  return response.text()
}).then((html) => {
  document.querySelector('.js-header').innerHTML=html;
 
  document.querySelector('.cart-quantity').innerHTML=calcQuantity();
})