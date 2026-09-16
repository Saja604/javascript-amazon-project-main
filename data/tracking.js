import { loadProductsFetch, products } from "./products.js";
import {orders} from "./orders.js";

const url= new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

async function loadOrdersPage(){
  await loadProductsFetch();
  renderTrackingItem();
}

loadOrdersPage();

function renderTrackingItem () {
  const order = orders.find(order => orderId===order.id);
  const product = products.find(p => p.id===productId);
  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId===productId;
  });
  const arrivalDate= new Date(orderProduct.estimatedDeliveryTime);
  const formattedArrivalDate = new Intl.DateTimeFormat ('en-US', {
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    }).format(arrivalDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  arrivalDate.setHours(0, 0, 0, 0);

  const html = `
    <a class="back-to-zorders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${formattedArrivalDate}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${orderProduct.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label preparing-label">
        Preparing
      </div>
      <div class="progress-label shipped-label">
        Shipped
      </div>
      <div class="progress-label delivered-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `

  document.querySelector('.order-tracking').innerHTML=html;

  // if we are editing something without the need to refresh the page or recall the render fucntion (for example click trigger), we use this. or if we are editing an existing html, for example lets say one of the labels already have the current status class by default in the html code, so before editing if we need to remove it.
  // TRY THAT TOMORROW
  document.querySelectorAll('.current-status').forEach(element => {
    element.classList.remove('current-status');
  });

  if(today<arrivalDate){
    document.querySelector('.preparing-label').classList.add('current-status');
  }
  else if(today>arrivalDate){
    document.querySelector('.delivered-label').classList.add('current-status');
  }
  else{
    document.querySelector('.shipped-label').classList.add('current-status');
  }

  const progressBar = document.querySelector('.progress-bar');
  document.querySelectorAll('.progress-label').forEach((label, index) => {
    if(label.classList.contains('current-status')){
      // if(label.matches('.progress-label.current-status')){
      const progressPercentage = (index/2)*100;
      progressBar.style.width = `${progressPercentage}%`;
      progressBar.style.setProperty('--target-width' , `${progressPercentage}%`);
    }
  });

  // more advanced
  // const progressLabels = document.querySelectorAll('.progress-label');
  // const currentStatus = document.querySelector('.progress-label.current-status');
  // const progressBar = document.querySelector('.progress-bar');
  // const currentStatusIndex = Array.from(progressLabels).indexOf(currentStatus);
  // const progressPercentage = currentStatusIndex / (progressLabels.length - 1) * 100;

  // progressBar.style.width = `${progressPercentage}%`;
};