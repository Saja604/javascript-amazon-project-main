import { loadProductsFetch, products } from "./products.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}

async function loadOrdersPage(){
  await loadProductsFetch();
  loadOrders();
}

loadOrdersPage()

export function loadOrders(){
  let ordersList=[];
  orders.forEach((order) => {
    let orderList = `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${order.orderTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$ ${order.totalCostCents}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>`

    const orderProducts=order.products;

    orderProducts.forEach((orderProduct) => {
      const product = products.find((p) => {
        return p.id===orderProduct.productId;
      })
      console.log(product);
      const html =`
          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${orderProduct.estimatedDeliveryTime}
              </div>
              <div class="product-quantity">
                Quantity: ${orderProduct.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
      `
      orderList+=html;
      
    })
    orderList+=`</div>`;
    ordersList+=orderList;
  })

  document.querySelector('.orders-grid').innerHTML=ordersList;
  
}