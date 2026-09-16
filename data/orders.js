import { loadProductsFetch, products } from "./products.js";
import { formatCurrency } from "../scripts/money.js";
import { cartItems, addToCart, loadFromStorage } from "../scripts/cart.js";
import { calcQuantity } from "../scripts/amazon.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}

async function loadOrdersPage(){
  if (!document.querySelector('.orders-grid')) {
    return;
  }

  await loadProductsFetch();
  loadOrders();
}

loadOrdersPage()
console.log(orders)
export function loadOrders(){
  const ordersGrid = document.querySelector('.orders-grid');
  if (!ordersGrid) {
    return;
  }

  let ordersList=[];
  orders.forEach((order) => {
    const orderDate = new Date(order.orderTime);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    }).format(orderDate);

    let orderList = `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${formattedDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$ ${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
      <div class="order-details-grid">
      `

    const orderProducts=order.products;

    orderProducts.forEach((orderProduct) => {
      const product = products.find((p) => {
        return p.id===orderProduct.productId;
      })
      const arrivalDate= new Date(orderProduct.estimatedDeliveryTime);
      const formattedArrivalDate = new Intl.DateTimeFormat ('en-US', {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      }).format(arrivalDate);

      const html =`
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formattedArrivalDate}
          </div>
          <div class="product-quantity">
            Quantity: ${orderProduct.quantity}
          </div>
          <button data-id="${product.id}" class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `
      orderList+=html;
      
    })
    orderList+=`</div> </div>`;
    ordersList+=orderList;
  })

  ordersGrid.innerHTML=ordersList;

  document.querySelectorAll(".buy-again-button").forEach((buyButton, index) => {
    buyButton.addEventListener('click', () => {
      loadFromStorage();
      const productIdFromButton =  buyButton.dataset.id;
      addToCart(productIdFromButton, 1);
      
      document.querySelector('.cart-quantity').innerHTML=calcQuantity();
    });
  });
  
}