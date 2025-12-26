document.addEventListener("DOMContentLoaded", () => {
  const cartItem = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("cart-empty");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-button");
  const homeIcon = document.getElementById("home");
  const cartIcon = document.getElementById("cart-page");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map((item) => ({ ...item, quantity: item.quantity || 1 }));

  renderCart();

  homeIcon.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  cartIcon.addEventListener("click", () => {
    window.location.href = "cart.html";
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
          <div class="img-cont">
            <img src="${item.thumbnail}" alt="${item.title}" />
          </div>

          <div class="cart-item-info">
            <div class="cart-details">
              <span>${item.title}</span>
              <strong>$${item.price}</strong>
            </div>
            <div class="cart-actions">
              <button data-index="${index}" data-action="remove">🗑 Remove</button>
              <div class="quantity-control">
                <button class='minus' data-index="${index}" data-action="decrease">-</button>
                <span class='quantity'>${item.quantity}</span>
                <button data-index="${index}" data-action="increase">+</button>
              </div>
            </div>
          </div>
        `;
        totalPrice += item.price * item.quantity;
        cartItem.appendChild(cartList);
      });
      totalPriceDisplay.textContent = `$ ${totalPrice.toFixed(2)}`;
      checkOutBtn.textContent = `Checkout ($ ${totalPrice.toFixed(2)})`;
    } else {
      cartItem.innerHTML =
        '<p class="empty" id="cart-empty">🛒 Your Cart is empty...</p>';
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = "$0.00";
      checkOutBtn.textContent = "Checkout";
    }
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  cartItem.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const itemIndex = parseInt(e.target.getAttribute("data-index"));
      const action = e.target.getAttribute("data-action");
      if (action === "remove") {
        cart.splice(itemIndex, 1);
      } else if (action === "decrease") {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity -= 1;
        } else {
          cart.splice(itemIndex, 1);
        }
      } else if (action === "increase") {
        cart[itemIndex].quantity += 1;
      }
      saveCart();
      renderCart();
    }
  });

  checkOutBtn.addEventListener("click", () => {
    const finalTotal = totalPriceDisplay.textContent;
    if (cart.length > 0) {
      alert(
        `✅ Checkout Successful!\n\n🛍️ Total Paid: ${finalTotal}\n\nThank you for shopping with us! 🎉`
      );
    } else {
      alert("Your cart is empty.\n\nPlease add items before checking out.");
    }
    cart.length = 0;
    saveCart();
    renderCart();
    
  });
});
