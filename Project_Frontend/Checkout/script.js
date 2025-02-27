document.addEventListener("DOMContentLoaded", () => {
  const Products = [
    { id: 1, name: "Product 1", price: 29.989 },
    { id: 2, name: "Product 2", price: 10.3 },
    { id: 3, name: "Product 3", price: 16.85 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product_List");
  const cartItems = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const cartTotal = document.getElementById("cartTotal");
  const totalPriceDisplay = document.getElementById("totalPrice");
  const checkOutButton = document.getElementById("checkOut");

  Products.forEach((product) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name}- $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      let product = Products.find((p) => p.id === productId);
      addToCart(product);
      saveCart();
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCart.classList.add("hidden");
      cartTotal.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        let cartItem = document.createElement("div");
        cartItem.innerHTML = `
        <span>${item.name}  -  $${item.price.toFixed(2)}</span>
        <button class="removeBtn"  data-index="${index}">Remove</button>`;

        totalPriceDisplay.textContent = totalPrice.toFixed(2);

        cartItems.appendChild(cartItem);
      });
    } else {
      emptyCart.classList.remove("hidden");

      totalPriceDisplay.textContent = `$0.00`;
    }

    document.querySelectorAll(".removeBtn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        cart.splice(index, 1);
        renderCart();
        saveCart();
      });
    });
  }

  checkOutButton.addEventListener("click", () => {
    if (parseFloat(totalPriceDisplay.textContent) > 0) {
      cart.length = 0;
      saveCart();
      alert("Checkout Successfully");
      renderCart();
    } else {
      alert("Your cart is empty");
    }
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  renderCart();
});
