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
    const cartDisplay = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartDisplay.innerHTML = '';
    let total = 0;

    for (let id in cart) {
        const item = cart[id];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartDisplay.innerHTML += `
            <div>
                ${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}
                <button onclick="removeFromCart(${id})">Remove One</button>
            </div>
        `;
    }

    cartTotal.textContent = `Subtotal: $${total}`;
}

function checkout() {
    alert('Proceeding to checkout...');
    // Integrate with payment gateway here
}