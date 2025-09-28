let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(productId, name, price) {
    if (!cart[productId]) {
        cart[productId] = {
            name: name,
            price: price,
            quantity: 1
        };
    } else {
        cart[productId].quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart`);
}

function removeFromCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity -= 1;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function emptyCart() {
    cart = {};
    localStorage.removeItem('cart');
    displayCart();
}

function displayCart() {

    cart = JSON.parse(localStorage.getItem('cart')) || {};

    const cartDisplay = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartDisplay.innerHTML = '';
    let total = 0;

    if (Object.keys(cart).length === 0) {
        cartDisplay.innerHTML = '<p>Cart is empty.</p>';
        cartTotal.textContent = '';
        return;
    }

    for (let id in cart) {
        const item = cart[id];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartDisplay.innerHTML += `
           <div class="cart-item">
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${item.price}</span>
                </div>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity('${id}')">-</button>
                    <span class="quantity-box">${item.quantity}</span>
                    <button onclick="increaseQuantity('${id}')">+</button>
                </div>
                <div class="item-total">$${itemTotal}</div>
            </div>
        `;
    }

    cartTotal.textContent = `Subtotal: $${total.toFixed(2)}`;
}

function increaseQuantity(productId) {
    if (cart[productId]) {
        cart[productId].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function decreaseQuantity(productId) {
    if (cart[productId]) {
        cart[productId].quantity -= 1;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function checkout() {
    alert('Proceeding to checkout...');
    // Integrate with payment gateway here
}