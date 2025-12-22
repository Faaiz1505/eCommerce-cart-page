document.addEventListener("DOMContentLoaded", () => {
  const productsURL = "https://dummyjson.com/products";
  let products = [];

  const homeIcon = document.getElementById("home");
  const cartIcon = document.getElementById("cart-page");
  const productList = document.getElementById("product-list");
  const cartBadge = document.getElementById("cart-badge");
  const message = document.getElementById("message");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let messageTimeout;
  cart = cart.map((item) => ({ ...item, quantity: item.quantity || 1 }));

  updateCartBadge();

  homeIcon.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  cartIcon.addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  fetch(productsURL)
    .then((res) => res.json())
    .then((data) => {
      products = data.products;

      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("item");

        productDiv.innerHTML = `
        <div class="img-cont">
          <img src="${product.thumbnail}" alt="${product.title}" />
        </div>
        <h4>${product.title}</h4>
        <p>${product.description}</p>
        <div class="pro-cont">
          <strong>$${product.price}</strong>
          <button data-id="${product.id}">Add to cart</button>
        </div>
      `;
        productList.appendChild(productDiv);
      });
    })
    .catch((err) => console.error("Error fetching products:", err));

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((product) => product.id === productId);
      const existingItem = cart.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      saveCart();
      message.textContent = `${product.title} added to cart!`;
      message.classList.remove("hidden");
      const rect = e.target.getBoundingClientRect();
      message.style.top = `${rect.top + window.scrollY - 10}px`;
      message.style.left = `${rect.left + rect.width / 2}px`;

      if (messageTimeout) {
        clearTimeout(messageTimeout);
      }
      messageTimeout = setTimeout(() => {
        message.classList.add("hidden");
      }, 1500);
    }
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
  }

  function updateCartBadge() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalQuantity;
    if (totalQuantity > 0) {
      cartBadge.style.display = "inline-block";
    } else {
      cartBadge.style.display = "none";
    }
  }
});
