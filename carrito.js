let cart = [];

// Cargar carrito desde localStorage al cargar la página
window.onload = function () {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  } else {
    updateCart(); // para mostrar contador en 0 si no hay carrito aún
  }
};

// Agregar producto al carrito
function addToCart(name, price) {
  const product = cart.find(p => p.name === name);
  if (product) {
    product.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart();
  updateCart();
  showConfirmation(`✔️ Se ha agregado "${name}" al carrito`);
}

// Guardar carrito en localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Actualizar panel del carrito y contador
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  let total = 0;
  let count = 0;

  if (cartItems) cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    if (cartItems) {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} x ${item.quantity} - $${item.price * item.quantity}
        <button onclick="removeFromCart(${index})">❌</button>
      `;
      cartItems.appendChild(li);
    }
  });

  if (cartTotal) cartTotal.textContent = total;
  if (cartCount) cartCount.textContent = count;
}

// Eliminar un producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

// Alternar panel lateral del carrito
function toggleCart() {
  const panel = document.getElementById("cart-panel");
  if (panel) panel.classList.toggle("open");
}

// Finalizar compra
function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Gracias por tu compra. Total pagado: $${total}`);
  cart = [];
  saveCart();
  updateCart();
  toggleCart();
}

// Mostrar mensaje de confirmación
function showConfirmation(message) {
  const existing = document.getElementById("confirmation-msg");
  if (existing) existing.remove();

  const div = document.createElement("div");
  div.id = "confirmation-msg";
  div.textContent = message;
  div.style.position = "fixed";
  div.style.top = "20px";
  div.style.right = "20px";
  div.style.background = "#4caf50";
  div.style.color = "white";
  div.style.padding = "10px 20px";
  div.style.borderRadius = "8px";
  div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  div.style.zIndex = "9999";
  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 2500);
}