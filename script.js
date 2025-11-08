document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 59.99 },
    { id: 2, name: "Smart Watch", price: 129.99 },
    { id: 3, name: "Bluetooth Speaker", price: 39.99 },
    { id: 4, name: "E-book Reader", price: 89.99 },
    { id: 5, name: "Fitness Tracker", price: 49.99 },
  ];

  const productList = document.getElementById("product-list");
  const cartItem = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("cart-empty");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-button");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("item");
    productDiv.innerHTML = `
  <span>${product.name} - $${product.price.toFixed(2)}</span>
  <button data-id="${product.id}">Add to cart</button>
  `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((product) => product.id === productId);
      cart.push(product);
      saveCart();
      renderCart();
    }
  });

  function renderCart() {
    cartItem.innerHTML = "";
    let totalPrice = 0;

    if (cart.length) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        const cartList = document.createElement("div");
        cartList.classList.add("cartDiv");
        cartList.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button data-index="${index}">Remove</button>
      `;
        totalPrice += item.price;
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        cartItem.appendChild(cartList);
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = "$0.00";
    }
  }

  cartItem.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const itemIndex = parseInt(e.target.getAttribute("data-index"));
      cart.splice(itemIndex, 1);
      renderCart();
      saveCart();
    }
  });

  checkOutBtn.addEventListener("click", () => {
    const finalTotal = totalPriceDisplay.textContent;
    cart.length = 0;
    saveCart();
    renderCart();
    alert(
      `✅ Checkout Successful!\n\n🛍️ Total Paid: ${finalTotal}\n\nThank you for shopping with us! 🎉`
    );
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
